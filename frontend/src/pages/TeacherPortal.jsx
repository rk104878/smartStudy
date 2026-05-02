import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Upload, LayoutDashboard, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

const TeacherPortal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/teacher-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Form Side */}
          <motion.div 
            className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Sparkles className="w-32 h-32 text-blue-600" />
            </div>
            <div className="mb-12 relative z-10">
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Teacher Login</h1>
              <p className="text-slate-500 text-lg">Empower your students with expert guidance.</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.com"
                  className="w-full px-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 border-slate-200" />
                  <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700">Remember me</span>
                </label>
                <a href="#" className="text-sm font-black text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-5 text-xl rounded-[2rem] shadow-xl shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <LogIn className="w-6 h-6" />
              </button>
            </form>
            <div className="mt-12 pt-10 border-t border-slate-50 text-center">
              <p className="text-slate-500 font-medium">New here? <a href="#" className="font-black text-blue-600 hover:underline">Apply for Teaching</a></p>
            </div>
          </motion.div>

          {/* Info Side */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Modern Tools for <br /><span className="gradient-text">Modern Educators</span></h2>
              <p className="text-xl text-slate-600 leading-relaxed">Focus on teaching, we'll handle the rest. Manage assignments, track student growth, and collaborate seamlessly.</p>
            </motion.div>
            
            <div className="grid gap-8">
              {[
                { title: 'Interactive Dashboard', icon: <LayoutDashboard className="text-blue-600 w-7 h-7" />, desc: 'Real-time analytics for all your active classes.' },
                { title: 'Smart Invite System', icon: <UserPlus className="text-blue-600 w-7 h-7" />, desc: 'Onboard students instantly with dynamic invite codes.' },
                { title: 'Resource Hub', icon: <Upload className="text-blue-600 w-7 h-7" />, desc: 'Cloud storage for all your study materials and videos.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex gap-8 p-8 glass rounded-[2.5rem] hover:shadow-xl transition-all border-white/60"
                >
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-lg">Verified Portal</p>
                  <p className="text-slate-400 text-sm">Enterprise-grade security</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPortal;
