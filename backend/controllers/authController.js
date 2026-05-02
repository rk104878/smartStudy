import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' } // Reduced from 30d to 7d for better security
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, teacherId } = req.body;
    
    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Validate teacherId if registering as student
    if (role === 'student') {
      if (!teacherId) return res.status(400).json({ message: 'Teacher ID is required for students' });
      const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
      if (!teacher) return res.status(404).json({ message: 'Invalid Teacher ID' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      teacherId: role === 'student' ? teacherId : undefined
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
      ...(user.role === 'teacher' && { inviteLink: `${frontendUrl}/register/student/${user._id}` })
    });
  } catch (error) {
    console.error(`Register error: ${error.message}`);
    res.status(500).json({ message: 'Server error during registration' }); // Avoid leaking stack traces
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
        ...(user.role === 'teacher' && { inviteLink: `${frontendUrl}/register/student/${user._id}` })
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
};
