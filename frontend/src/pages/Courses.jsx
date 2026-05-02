import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const classes = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  
  const courses = [
    { id: 1, title: 'Advanced Mathematics', class: 'Class 10', category: 'Math', students: '1.2k', duration: '24 hrs', color: 'bg-blue-600' },
    { id: 2, title: 'Principles of Physics', class: 'Class 11', category: 'Science', students: '800', duration: '30 hrs', color: 'bg-indigo-600' },
    { id: 3, title: 'English Literature', class: 'Class 8', category: 'English', students: '2.5k', duration: '15 hrs', color: 'bg-rose-600' },
    { id: 4, title: 'Chemical Bonding', class: 'Class 12', category: 'Science', students: '1.5k', duration: '20 hrs', color: 'bg-emerald-600' },
    { id: 5, title: 'Indian History', class: 'Class 9', category: 'Social Science', students: '1.1k', duration: '18 hrs', color: 'bg-amber-600' },
    { id: 6, title: 'Geometry Essentials', class: 'Class 7', category: 'Math', students: '900', duration: '12 hrs', color: 'bg-violet-600' },
  ];

  const filteredCourses = courses.filter(course => 
    (selectedClass === 'All' || course.class === selectedClass) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-24 gradient-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
              Explore Our <br /><span className="gradient-text">Premium Courses</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-xl leading-relaxed">
              Curated study materials and live sessions designed to help you master every subject.
            </p>
          </motion.div>
          
          {/* Search & Filter */}
          <motion.div 
            className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 p-4 glass rounded-[2.5rem] shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for courses, subjects..." 
                className="w-full pl-14 pr-6 py-5 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white text-lg font-medium shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select 
                className="w-full pl-14 pr-10 py-5 rounded-2xl border-none bg-white appearance-none focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer font-bold text-slate-700"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </motion.div>
        </div>
        {/* Animated Background Element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </section>

      {/* Course Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <motion.div 
                    layout
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden card-hover flex flex-col h-full"
                  >
                    <div className={`h-56 ${course.color} p-10 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className="glass px-4 py-1 rounded-xl text-xs font-black text-white uppercase tracking-widest">
                          {course.category}
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl">
                           <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <BookOpen className="w-24 h-24 text-white opacity-40 group-hover:scale-125 transition-transform duration-700 group-hover:rotate-12" />
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl uppercase tracking-tighter">{course.class}</span>
                        <div className="flex items-center text-slate-400 text-sm font-medium">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" /> {course.duration}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-snug">{course.title}</h3>
                      <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center text-slate-500 text-sm font-semibold">
                          <Users className="w-5 h-5 mr-2 text-blue-500 opacity-50" /> {course.students} Learners
                        </div>
                        <button className="btn-primary py-2.5 px-6 rounded-xl text-sm group/btn shadow-none hover:shadow-lg">
                          Join <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full py-32 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white p-12 rounded-[3rem] border border-dashed border-slate-200 inline-block">
                    <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-2xl font-bold text-slate-400">No courses found matching your criteria.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
