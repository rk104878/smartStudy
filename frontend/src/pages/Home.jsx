import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, BookOpen, BarChart, ArrowRight, Star, Sparkles } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Home = () => {
  const features = [
    {
      title: 'Structured Content',
      desc: 'Expertly organized courses covering NCERT and beyond, tailored for Class 6 to 12.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Dedicated Teacher',
      desc: 'Connect with expert educators who guide you through every concept with clarity.',
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Track Progress',
      desc: 'Visualize your learning journey with detailed analytics and performance reports.',
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 gradient-bg">
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-2xl text-blue-600 text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Modernizing Education Together</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[1.1]">
                Learn Better <br />
                <span className="gradient-text">Together.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the next generation of digital learning. Personalized paths, expert mentors, and a community that grows with you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link to="/student-portal" className="btn-primary text-lg shadow-blue-200/50">
                  Student Login <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/teacher-portal" className="btn-secondary text-lg">
                  Teacher Portal
                </Link>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-6 pt-8 border-t border-slate-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-200 shadow-sm" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">12,400+ Active Learners</p>
                  <p className="text-xs text-slate-400">Join the smartest community today</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative z-10 animate-float">
                <img 
                  src={heroImg} 
                  alt="LMS Illustration" 
                  className="w-full max-w-xl mx-auto drop-shadow-[0_35px_35px_rgba(37,99,235,0.25)]" 
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-[2rem] -rotate-12 blur-sm" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-600/5 rounded-[3rem] rotate-12 blur-sm" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">Why SmartStudy <span className="text-blue-600">Works?</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">We've built a platform that combines traditional academic excellence with modern interactive tools.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group p-10 rounded-[2.5rem] border border-slate-100 bg-white card-hover relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                   <Sparkles className="w-20 h-20 text-blue-600" />
                </div>
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
             {[
               { label: 'Courses', val: '200+' },
               { label: 'Students', val: '15k+' },
               { label: 'Teachers', val: '500+' },
               { label: 'Satisfaction', val: '99%' }
             ].map((stat, i) => (
               <div key={i} className="space-y-2">
                 <p className="text-4xl lg:text-5xl font-black text-white">{stat.val}</p>
                 <p className="text-blue-400 font-medium tracking-widest uppercase text-xs">{stat.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              className="space-y-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Real Stories from <br />
                <span className="text-blue-600">Our Community</span>
              </h2>
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 flex gap-6 group hover:border-blue-200 transition-colors">
                    <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-2xl" />
                    <div>
                      <div className="flex text-yellow-400 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-slate-600 italic mb-4 text-lg leading-relaxed">
                        "The platform has completely transformed how I manage my studies. The teacher portal is so intuitive!"
                      </p>
                      <p className="font-bold text-slate-900 text-lg">Rahul Sharma</p>
                      <p className="text-sm text-slate-400 font-medium">Class 12 Student • CBSE</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="glass-dark rounded-[3rem] p-16 text-white relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-10 -right-10 p-8 opacity-10">
                <CheckCircle className="w-80 h-80" />
              </div>
              <h3 className="text-4xl font-black mb-8 relative z-10 leading-tight">Unlock Your Full <br />Potential Today</h3>
              <p className="text-blue-100 mb-10 text-xl relative z-10 leading-relaxed">
                Join our premium membership and get access to exclusive study materials and one-on-one sessions.
              </p>
              <Link to="/contact" className="inline-flex bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20 relative z-10">
                Get Started Now <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
