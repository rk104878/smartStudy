import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, FileText, LogOut, Settings, User } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const links = user?.role === 'teacher' ? [
    { name: 'Dashboard', path: '/teacher-dashboard', icon: LayoutDashboard },
    { name: 'Materials', path: '/teacher-materials', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
  ] : [
    { name: 'My Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
    { name: 'Study Material', path: '/student-materials', icon: FileText },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-slate-900 text-white min-h-screen p-10 flex flex-col sticky top-0 h-screen"
    >
      <div className="mb-16 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
           <BookOpen className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-black tracking-tighter">SmartStudy</span>
      </div>

      <div className="flex-1 space-y-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 ml-2">Main Menu</p>
        {links.map((link) => (
          <NavLink 
            key={link.name} 
            to={link.path} 
            className={({isActive}) => `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <link.icon size={22} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold">{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="pt-10 border-t border-slate-800 space-y-6">
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-sm">
                 {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                 <p className="font-bold text-sm truncate">{user?.name}</p>
                 <p className="text-[10px] text-slate-500 uppercase font-black">{user?.role}</p>
              </div>
           </div>
           <button 
             onClick={logout} 
             className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full font-black text-xs uppercase tracking-widest"
           >
             <LogOut size={16} />
             <span>Logout Session</span>
           </button>
        </div>
        
        <p className="text-[10px] text-slate-600 text-center font-medium">v1.0.4 Premium Edition</p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
