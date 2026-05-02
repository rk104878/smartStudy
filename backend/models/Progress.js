import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  status: { type: String, enum: ['completed'], default: 'completed' },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure a student can only have one progress record per material
progressSchema.index({ studentId: 1, materialId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
