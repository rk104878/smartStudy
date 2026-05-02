import Material from '../models/Material.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';

export const getAssignedMaterials = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    if (!student || !student.teacherId) {
      return res.status(400).json({ message: 'No teacher assigned' });
    }

    const materials = await Material.find({ teacherId: student.teacherId });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markMaterialComplete = async (req, res) => {
  try {
    const { materialId } = req.body;
    
    const existingProgress = await Progress.findOne({ studentId: req.user.id, materialId });
    if (existingProgress) {
      return res.status(400).json({ message: 'Material already marked as complete' });
    }

    const progress = await Progress.create({
      studentId: req.user.id,
      materialId
    });

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ studentId: req.user.id }).populate('materialId');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
