import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 font-sans">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-slate-800">SmartStudy LMS</span>
        </div>
        <div className="flex gap-4">
          <Link to="/auth?role=student" className="text-indigo-600 font-medium hover:text-indigo-800 px-4 py-2">Student Login</Link>
          <Link to="/auth?role=teacher" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">Teacher Portal</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          The Modern Way to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Learn Together</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
          A seamless platform connecting teachers and students. Teachers manage NCERT materials, notes, and quizzes. Students focus on learning securely.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Structured Content</h3>
            <p className="text-slate-600">Access strictly curated NCERT books and custom teacher notes categorized by subjects.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Dedicated Teacher</h3>
            <p className="text-slate-600">Students only see materials from their assigned teacher to avoid confusion and distractions.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <GraduationCap className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Track Progress</h3>
            <p className="text-slate-600">Take quizzes and track your educational milestones efficiently inside the dashboard.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
