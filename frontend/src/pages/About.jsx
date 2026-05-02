import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, ShieldCheck, Zap, Globe, Award, Heart } from 'lucide-react';

const About = () => {
  const highlights = [
    { title: 'Safe Environment', icon: <ShieldCheck className="w-6 h-6" />, desc: 'Moderated community for safe student-teacher interaction.' },
    { title: 'Global Reach', icon: <Globe className="w-6 h-6" />, desc: 'Access high-quality education from anywhere in the country.' },
    { title: 'Fast Learning', icon: <Zap className="w-6 h-6" />, desc: 'Interactive tools designed to speed up comprehension.' },
  ];

  return (
    <div className="pt-20">
      {/* Introduction */}
      <section className="py-32 gradient-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
                <Heart className="w-4 h-4 fill-current" />
                <span>Our Story</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight">
                Empowering the <br />
                <span className="gradient-text">Thinkers</span> of Tomorrow
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                SmartStudy LMS started with a simple vision: to make high-quality education collaborative and accessible to every student, regardless of their location.
              </p>
              <div className="grid grid-cols-2 gap-10 pt-6">
                <div className="p-6 glass rounded-3xl">
                  <p className="text-4xl font-black text-blue-600 mb-1">50k+</p>
                  <p className="text-slate-500 font-medium">Active Students</p>
                </div>
                <div className="p-6 glass rounded-3xl">
                  <p className="text-4xl font-black text-blue-600 mb-1">2k+</p>
                  <p className="text-slate-500 font-medium">Expert Teachers</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-blue-600/5 rounded-[4rem] flex items-center justify-center overflow-hidden border border-blue-100 shadow-inner">
                <div className="w-4/5 h-4/5 glass rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-200">
                      <Award className="w-12 h-12 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900">Award Winning Platform</h3>
                   <p className="text-slate-500">Recognized for innovation in digital pedagogy and student engagement.</p>
                </div>
              </div>
              {/* Decorative Orbs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: 'Our Mission', icon: <Target className="w-10 h-10 text-white" />, desc: 'To provide every student with the tools and mentorship they need to achieve their academic goals through innovative technology.', color: 'bg-blue-600' },
              { title: 'Our Vision', icon: <Eye className="w-10 h-10 text-white" />, desc: 'To become the leading platform for digital education in India, making high-quality learning materials available to everyone.', color: 'bg-slate-900' }
            ].map((box, i) => (
              <motion.div 
                key={i}
                className="bg-slate-50 p-16 rounded-[3.5rem] space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className={`${box.color} w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {box.icon}
                </div>
                <h2 className="text-4xl font-bold text-slate-900">{box.title}</h2>
                <p className="text-slate-600 text-xl leading-relaxed">
                  {box.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl font-black mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Collaboration at the <span className="text-blue-600">Core</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {highlights.map((item, i) => (
              <motion.div 
                key={i} 
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
