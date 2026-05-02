import React, { useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const { teacherId: urlTeacherId } = useParams();
  
  const defaultRole = urlTeacherId ? 'student' : (searchParams.get('role') || 'student');
  const [isLogin, setIsLogin] = useState(urlTeacherId ? false : true);
  const [role, setRole] = useState(defaultRole);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', teacherId: urlTeacherId || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password, role, formData.teacherId);
      }
      navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500 text-center mb-8 font-medium">
          {isLogin ? 'Login to your smart learning portal' : 'Join our modern learning community'}
        </p>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          <button 
            type="button"
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${role === 'student' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('student')}
          >Student</button>
          <button 
            type="button"
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${role === 'teacher' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('teacher')}
          >Teacher</button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-black text-slate-700 mb-2 ml-1">Full Name</label>
              <input 
                id="name"
                type="text" 
                required 
                className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors" 
                placeholder="John Doe"
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-black text-slate-700 mb-2 ml-1">Email Address</label>
            <input 
              id="email"
              type="email" 
              required 
              className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors" 
              placeholder="name@example.com"
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-black text-slate-700 mb-2 ml-1">Password</label>
            <input 
              id="password"
              type="password" 
              required 
              className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors" 
              placeholder="••••••••"
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>

          {!isLogin && role === 'student' && (
            <div>
              <label htmlFor="teacherId" className="block text-sm font-black text-slate-700 mb-2 ml-1">Teacher ID</label>
              <input 
                id="teacherId"
                type="text" 
                required 
                className="w-full border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors" 
                placeholder="Enter Teacher's unique ID"
                value={formData.teacherId} 
                onChange={(e) => setFormData({...formData, teacherId: e.target.value})} 
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-black hover:underline">
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
