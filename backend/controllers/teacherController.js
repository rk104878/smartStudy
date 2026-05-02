import User from '../models/User.js';
import Material from '../models/Material.js';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student', teacherId: req.user.id }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadMaterial = async (req, res) => {
  try {
    const { title, type, classCategory, subject, content } = req.body;
    let fileUrl = '';
    
    if (req.file) {
      // In a real app, upload to S3 or Cloudinary and get URL. For now, local path.
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const material = await Material.create({
      title,
      type,
      classCategory,
      subject,
      fileUrl,
      content,
      teacherId: req.user.id
    });

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ teacherId: req.user.id });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProgressForTeacher = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findOne({ _id: studentId, role: 'student', teacherId: req.user.id }).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found or not assigned to you' });
    }

    const totalMaterials = await Material.countDocuments({ teacherId: req.user.id });
    const progress = await Progress.find({ studentId }).populate('materialId');

    const completedMaterials = progress.length;
    const completionPercentage = totalMaterials === 0 ? 0 : Math.round((completedMaterials / totalMaterials) * 100);

    res.json({
      student,
      progress,
      totalMaterials,
      completedMaterials,
      completionPercentage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
