import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Users, Copy, Check, ExternalLink, Sparkles, LayoutDashboard } from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/teacher/students');
        setStudents(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchStudents();
  }, [user]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10 lg:p-16 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black text-slate-900 mb-2">Welcome Back,</h1>
            <p className="text-xl text-slate-500 font-medium">Professor <span className="text-blue-600 font-bold">{user?.name}</span></p>
          </motion.div>
          <div className="flex gap-4">
             <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <Sparkles className="w-6 h-6 text-blue-600" />
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users className="w-24 h-24 text-blue-600" />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Total Students</p>
            <h3 className="text-5xl font-black text-slate-900 mb-2">{students.length}</h3>
            <p className="text-blue-600 text-sm font-bold flex items-center gap-1">
              Active Learners <ExternalLink className="w-3 h-3" />
            </p>
          </motion.div>

          <motion.div 
            className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 h-full">
              <div>
                <p className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">Class Invite ID</p>
                <code className="text-3xl font-mono font-bold bg-white/10 px-6 py-3 rounded-2xl border border-white/5 inline-block mb-4">
                  {user?._id}
                </code>
                <p className="text-slate-400 font-medium">Students need this ID to link to your digital classroom.</p>
              </div>
              <button 
                onClick={() => copyToClipboard(user?._id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all ${copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {copied ? <><Check className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy ID</>}
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Student List */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                My Students <span className="bg-slate-100 text-slate-500 text-sm px-4 py-1 rounded-full">{students.length}</span>
              </h2>
              <button className="text-blue-600 font-bold hover:underline">View All</button>
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">Loading students...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <p className="text-red-500 font-bold">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 underline">Retry</button>
              </div>
            ) : students.length === 0 ? (
              <div className="py-20 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-slate-300" />
                </div>
                <p className="text-xl font-bold text-slate-400">No students joined yet.</p>
                <p className="text-slate-500 mt-2">Share your Teacher ID to get started.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                <AnimatePresence>
                  {students.map((s, index) => (
                    <motion.div 
                      key={s._id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-6 bg-slate-50 rounded-[2rem] flex justify-between items-center group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm font-black text-blue-600 text-xl">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg">{s.name}</p>
                          <p className="text-slate-500 font-medium">{s.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="text-xs bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-black uppercase tracking-widest">Active</span>
                         <button className="p-3 bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="View Student Profile">
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                         </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <motion.div 
              className="bg-blue-600 p-10 rounded-[3rem] text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-black mb-6">Quick Actions</h3>
              <div className="grid gap-4">
                 <button className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors border border-white/10">
                    Upload Material
                 </button>
                 <button className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors border border-white/10">
                    Create New Quiz
                 </button>
              </div>
            </motion.div>

            <motion.div 
              className="glass p-10 rounded-[3rem]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <h3 className="text-xl font-black text-slate-900 mb-6">System Status</h3>
               <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-700 font-bold">All Servers Online</span>
               </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
