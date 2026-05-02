import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* Header */}
      <section className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            className="text-5xl lg:text-8xl font-black mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get in <span className="text-blue-500">Touch</span>
          </motion.h1>
          <motion.p 
            className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Have questions? We're here to help you. Send us a message and our team will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Contact Form */}
            <motion.div 
              className="flex-[1.5] bg-white p-10 lg:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-blue-900/5 -mt-40 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <MessageSquare className="text-white w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Send a Message</h2>
              </div>
              
              <form className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="How can we help?" className="w-full px-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Your Message</label>
                  <textarea rows="5" placeholder="Write your message here..." className="w-full px-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="btn-primary w-full py-5 text-xl rounded-[2rem] shadow-xl shadow-blue-600/20">
                    Send Message <Send className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Info Cards */}
            <div className="flex-1 space-y-10">
              <motion.div 
                className="glass p-10 rounded-[3rem] border-white/60 shadow-xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-black mb-10 tracking-tight">Contact Information</h3>
                <div className="space-y-8">
                  {[
                    { label: 'Email us at', val: 'support@smartstudy.com', icon: <Mail className="text-blue-600 w-6 h-6" /> },
                    { label: 'Call us at', val: '+1 (234) 567-890', icon: <Phone className="text-blue-600 w-6 h-6" /> },
                    { label: 'Visit our office', val: '123 Education St, Learning City', icon: <MapPin className="text-blue-600 w-6 h-6" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group cursor-pointer">
                      <div className="bg-white w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div 
                className="bg-slate-900 rounded-[3rem] h-72 overflow-hidden relative group"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2345!3i1234!2m3!1e0!2sm!3i420120488!3m8!2sen!3sua!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover group-hover:scale-110 transition-transform duration-[2000ms]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-5 rounded-3xl shadow-2xl">
                    <MapPin className="text-blue-600 w-10 h-10 animate-bounce" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl text-center">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Find us on Google Maps</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
