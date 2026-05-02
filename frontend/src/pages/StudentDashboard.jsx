import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { BookOpen, Download, FileText, Sparkles, Clock, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/student/materials', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setMaterials(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMaterials();
  }, [user]);

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
            <h1 className="text-4xl font-black text-slate-900 mb-2">Hello, {user?.name.split(' ')[0]}!</h1>
            <p className="text-xl text-slate-500 font-medium italic">"The beautiful thing about learning is that no one can take it away from you."</p>
          </motion.div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
             <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">Learning Mode: On</span>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           <motion.div 
             className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20 relative overflow-hidden"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <Sparkles className="absolute top-6 right-6 w-8 h-8 opacity-20" />
              <p className="text-xs font-black uppercase tracking-widest mb-4 opacity-60">Today's Focus</p>
              <h3 className="text-2xl font-bold mb-2">Continue Mathematics</h3>
              <p className="text-blue-100 text-sm mb-6">Unit 4: Quadratic Equations</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-black text-sm">Resume Lesson</button>
           </motion.div>

           <motion.div 
             className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
           >
              <Clock className="text-blue-600 mb-4 w-8 h-8" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Study Hours</p>
              <h3 className="text-3xl font-black text-slate-900">12.5 hrs</h3>
              <p className="text-slate-500 text-sm mt-1">This week's progress</p>
           </motion.div>

           <motion.div 
             className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
              <BookOpen className="text-blue-600 mb-4 w-8 h-8" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Materials</p>
              <h3 className="text-3xl font-black text-slate-900">{materials.length} New</h3>
              <p className="text-slate-500 text-sm mt-1">Assigned by your teacher</p>
           </motion.div>
        </div>

        {/* Materials Grid */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
             <h2 className="text-2xl font-black text-slate-900">Digital Library</h2>
             <div className="flex gap-2">
                {['All', 'PDF', 'Note', 'Video'].map(t => (
                  <button key={t} className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${t === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {t}
                  </button>
                ))}
             </div>
          </div>

          {materials.length === 0 ? (
            <div className="py-20 text-center">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-xl font-bold text-slate-400">No materials assigned yet.</p>
              <p className="text-slate-500 mt-2">Your teacher will upload them soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {materials.map((m, index) => (
                  <motion.div 
                    key={m._id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all bg-slate-50 hover:bg-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <ArrowRight className="text-blue-600 w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-black text-blue-600 bg-blue-50 w-max px-3 py-1 rounded-lg mb-4 uppercase tracking-widest">{m.type}</div>
                    <h3 className="font-black text-slate-900 text-xl mb-2 leading-tight group-hover:text-blue-600 transition-colors">{m.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-8">{m.subject} • {m.classCategory}</p>
                    
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      {m.fileUrl ? (
                        <a 
                          href={`http://localhost:5000${m.fileUrl}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 italic">Static Content</span>
                      )}
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                         <FileText className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
