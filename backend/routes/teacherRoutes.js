import express from 'express';
import { protect, teacherOnly } from '../middlewares/authMiddleware.js';
import { getStudents, uploadMaterial, getMaterials, getStudentProgressForTeacher } from '../controllers/teacherController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.route('/students').get(protect, teacherOnly, getStudents);
router.route('/students/:studentId/progress').get(protect, teacherOnly, getStudentProgressForTeacher);
router.route('/materials').get(protect, teacherOnly, getMaterials).post(protect, teacherOnly, upload.single('file'), uploadMaterial);

export default router;
