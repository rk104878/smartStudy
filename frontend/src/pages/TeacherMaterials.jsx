import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Upload, FileText, Plus, Book, GraduationCap, X, CheckCircle2, AlertCircle, FileDigit } from 'lucide-react';

const TeacherMaterials = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '', type: 'PDF', classCategory: '', subject: '', content: ''
  });
  const [file, setFile] = useState(null);

  const fetchMaterials = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/teacher/materials', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMaterials(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMaterials(); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('type', formData.type);
    data.append('classCategory', formData.classCategory);
    data.append('subject', formData.subject);
    if (formData.content) data.append('content', formData.content);
    if (file) data.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/teacher/materials', data, {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData({ title: '', type: 'PDF', classCategory: '', subject: '', content: '' });
      setFile(null);
      setSuccess(true);
      fetchMaterials();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to upload material. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10 lg:p-16 flex flex-col lg:flex-row gap-12 overflow-y-auto">
        
        {/* Left Side: Material List */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-black text-slate-900 mb-2">Manage Materials</h1>
            <p className="text-xl text-slate-500 font-medium">Upload and organize your digital classroom resources.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {materials.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                  <FileDigit className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <p className="text-xl font-bold text-slate-400">Your library is empty.</p>
                  <p className="text-slate-500 mt-2">Start by uploading your first study material.</p>
                </div>
              ) : (
                materials.map((m, index) => (
                  <motion.div 
                    key={m._id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-8 rounded-[2.5rem] bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-[10px] font-black text-blue-600 bg-blue-50 w-max px-3 py-1 rounded-lg uppercase tracking-widest">{m.type}</div>
                      <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-red-400 cursor-pointer transition-colors">
                        <X className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-black text-slate-900 text-xl mb-2 group-hover:text-blue-600 transition-colors leading-tight">{m.title}</h3>
                    <div className="flex items-center gap-4 text-slate-500 font-medium text-sm mt-4 pt-4 border-t border-slate-50">
                       <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {m.classCategory}</span>
                       <span className="flex items-center gap-1.5"><Book className="w-4 h-4" /> {m.subject}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Upload Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[450px]"
        >
          <div className="bg-white p-10 lg:p-12 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white sticky top-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Plus className="text-white w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Upload New</h2>
            </div>

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-700 font-bold"
              >
                <CheckCircle2 className="w-5 h-5" /> Material uploaded successfully!
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 font-bold"
              >
                <AlertCircle className="w-5 h-5" /> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Material Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Newton's Laws of Motion"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                  <select 
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-bold text-slate-700" 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="PDF">PDF File</option>
                    <option value="Note">Text Note</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Grade</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Class 10"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium" 
                    value={formData.classCategory} 
                    onChange={e => setFormData({...formData, classCategory: e.target.value})} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Physics"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium" 
                  value={formData.subject} 
                  onChange={e => setFormData({...formData, subject: e.target.value})} 
                />
              </div>
              
              {formData.type === 'PDF' ? (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Select PDF</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      required 
                      className="hidden" 
                      id="file-upload"
                      onChange={e => setFile(e.target.files[0])} 
                    />
                    <label 
                      htmlFor="file-upload"
                      className="w-full px-6 py-10 rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <Upload className="w-8 h-8 text-slate-300 group-hover:text-blue-500 mb-2 transition-colors" />
                      <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600">
                        {file ? file.name : 'Choose PDF Document'}
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Note Content</label>
                  <textarea 
                    required 
                    placeholder="Enter lesson notes here..."
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 focus:bg-white bg-slate-50 outline-none transition-all font-medium h-32 resize-none" 
                    value={formData.content} 
                    onChange={e => setFormData({...formData, content: e.target.value})}
                  ></textarea>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary py-5 text-xl rounded-[2rem] shadow-xl shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Publish Material'} <Upload className="w-6 h-6 ml-2" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherMaterials;
