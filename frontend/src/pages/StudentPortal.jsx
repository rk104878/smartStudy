import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Book, BarChart3, GraduationCap, ArrowRight, Download, Sparkles, AlertCircle } from 'lucide-react';

const StudentPortal = () => {
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
      navigate('/student-dashboard');
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
          {/* Info Side */}
          <div className="order-2 lg:order-1 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Your Journey to <br /><span className="gradient-text">Excellence</span> Starts Here</h2>
              <p className="text-xl text-slate-600 leading-relaxed">Access world-class study materials, track your progress in real-time, and get personalized feedback from top educators.</p>
            </motion.div>
            
            <div className="grid gap-8">
              {[
                { title: 'Interactive Progress', icon: <BarChart3 className="text-blue-600 w-7 h-7" />, desc: 'Visualize your learning curve with smart analytics.' },
                { title: 'Digital Library', icon: <Book className="text-blue-600 w-7 h-7" />, desc: 'Instant access to NCERT books and premium notes.' },
                { title: 'Mentor Support', icon: <GraduationCap className="text-blue-600 w-7 h-7" />, desc: 'Connect with mentors who care about your growth.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
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
              className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles className="w-24 h-24 text-blue-500" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-blue-400 uppercase tracking-widest text-sm">Latest Resource</span>
                <span className="text-slate-500 text-xs font-bold">New Today</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">Physics Unit 5 Notes</p>
                    <p className="text-slate-400 text-xs">PDF • 4.2 MB</p>
                  </div>
                </div>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors">Get</button>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div 
            className="order-1 lg:order-2 bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 p-8 opacity-5">
               <Book className="w-32 h-32 text-blue-600" />
            </div>
            <div className="mb-12 relative z-10">
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Student Login</h1>
              <p className="text-slate-500 text-lg">Your academic success starts here.</p>
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
                  placeholder="name@example.com"
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
                  <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700">Stay signed in</span>
                </label>
                <a href="#" className="text-sm font-black text-blue-600">Help?</a>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-5 text-xl rounded-[2rem] shadow-xl shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Entering...' : 'Enter Dashboard'} <ArrowRight className="w-6 h-6" />
              </button>
            </form>
            <div className="mt-12 pt-10 border-t border-slate-50 text-center">
              <p className="text-slate-500 font-medium">New Student? <a href="#" className="font-black text-blue-600 hover:underline">Register Now</a></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
