const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// In-memory fallback users
let memoryUsers = [
  {
    _id: 'user_demo_1',
    name: 'Demo Shopper',
    email: 'demo@grabnsave.com',
    passwordHash: '$2a$10$wN3Q3w4gq3K5t5d5m5p5eOiY5s5s5s5s5s5s5s5s5s5s5s5s5s5s5', // fallback
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'user_admin_1',
    name: 'Grab Admin',
    email: 'admin@grabnsave.com',
    passwordHash: '$2a$10$wN3Q3w4gq3K5t5d5m5p5eOiY5s5s5s5s5s5s5s5s5s5s5s5s5s5s5',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: normalizedEmail.includes('admin') ? 'admin' : 'user',
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to Grab N Save.',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // In-memory fallback
    const exists = memoryUsers.find((u) => u.email === normalizedEmail);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: `user_${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashedPassword,
      role: normalizedEmail.includes('admin') ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };
    memoryUsers.push(newUser);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getIsConnected()) {
      const user = await User.findOne({ email: normalizedEmail });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const token = generateToken(user);

      return res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // In-memory fallback
    const user = memoryUsers.find((u) => u.email === normalizedEmail);
    if (!user) {
      // Allow instant demo logins
      if (password === 'password123' || password === 'admin123') {
        const demoUser = {
          _id: `user_${Date.now()}`,
          name: normalizedEmail.split('@')[0],
          email: normalizedEmail,
          role: normalizedEmail.includes('admin') ? 'admin' : 'user',
        };
        const token = generateToken(demoUser);
        return res.status(200).json({
          success: true,
          token,
          user: demoUser,
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login error occurred',
      error: error.message,
    });
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};
