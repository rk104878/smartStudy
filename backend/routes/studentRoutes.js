import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getAssignedMaterials, markMaterialComplete, getStudentProgress } from '../controllers/studentController.js';

const router = express.Router();

router.route('/materials').get(protect, getAssignedMaterials);
router.route('/progress').get(protect, getStudentProgress).post(protect, markMaterialComplete);

export default router;
