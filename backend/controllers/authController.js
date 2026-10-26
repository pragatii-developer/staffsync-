const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'staffsync_super_secret_jwt_key_2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department, designation, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Employee',
      department: department || 'Engineering',
      designation: designation || 'Software Engineer',
      phone: phone || '+91 9876543210'
    });

    if (user.role === 'Employee') {
      await Employee.create({
        user: user._id,
        employeeCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        department: user.department,
        designation: user.designation,
        skills: ['React.js', 'Node.js', 'MongoDB']
      });
    } else if (user.role === 'Manager') {
      await Manager.create({
        user: user._id,
        managerCode: `MGR-${Math.floor(100 + Math.random() * 900)}`,
        department: user.department
      });
    }

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation
      },
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        phone: user.phone
      },
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').lean();
    const employeeDetails = await Employee.findOne({ user: req.user._id }).lean();
    res.json({ success: true, user, employeeDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, department, designation, address, emergencyContact, skills } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (department) user.department = department;
    if (designation) user.designation = designation;
    await user.save();

    await Employee.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          ...(address && { address }),
          ...(emergencyContact && { emergencyContact }),
          ...(skills && { skills: Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()) })
        }
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
