import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Note', 'Assignment'], required: true },
  classCategory: { type: String, required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String }, // For PDF uploads
  content: { type: String }, // For text Notes/Assignments
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);
