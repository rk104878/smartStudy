import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    questionText: String,
    options: [String],
    correctAnswer: String
  }]
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
