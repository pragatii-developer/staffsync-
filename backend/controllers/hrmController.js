const User = require('../models/User');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Announcement = require('../models/Announcement');
const Training = require('../models/Training');
const Notification = require('../models/Notification');

// 7. Optimization: Pagination helper
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// Employee & HR: Attendance workflows
exports.markAttendance = async (req, res) => {
  try {
    const today = req.body.date || new Date().toISOString().split('T')[0];
    const checkIn = req.body.checkIn || new Date().toTimeString().slice(0, 5);
    const status = req.body.status || 'Present';
    const notes = req.body.notes || '';

    const record = await Attendance.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $set: { checkIn, status, notes, workHours: req.body.workHours || 8.5 } },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, message: 'Attendance marked successfully', data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = req.user.role === 'Employee' ? { user: req.user._id } : {};
    if (req.query.status) filter.status = req.query.status;

    const [records, total] = await Promise.all([
      Attendance.find(filter).populate('user', 'name email role department designation').sort({ date: -1 }).skip(skip).limit(limit).lean(),
      Attendance.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: records,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Leave Management (Employee Apply, Manager/HR Approve/Reject)
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, days, reason } = req.body;
    const leave = await Leave.create({
      user: req.user._id,
      leaveType,
      startDate,
      endDate,
      days: days || 1,
      reason
    });

    res.status(201).json({ success: true, message: 'Leave request submitted', data: leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = req.user.role === 'Employee' ? { user: req.user._id } : {};
    if (req.query.status) filter.status = req.query.status;

    const [leaves, total] = await Promise.all([
      Leave.find(filter)
        .populate('user', 'name email department designation role')
        .populate('reviewedBy', 'name role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Leave.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: leaves,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, reviewerComment } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
          reviewerComment: reviewerComment || `Reviewed by ${req.user.name} (${req.user.role})`,
          reviewedBy: req.user._id
        }
      },
      { new: true }
    ).populate('user', 'name email department');

    if (!leave) return res.status(404).json({ success: false, message: 'Leave request not found' });

    await Notification.create({
      recipient: leave.user._id,
      title: `Leave Request ${status}`,
      message: `Your ${leave.leaveType} request has been ${status.toLowerCase()}.`,
      type: 'Leave'
    });

    res.json({ success: true, message: `Leave ${status}`, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Employees & Managers Directory (HR & Manager Modules)
exports.getEmployees = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};
    if (req.query.department) filter.department = req.query.department;

    const [employees, total] = await Promise.all([
      Employee.find(filter).populate('user', 'name email role department designation phone status').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Employee.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: employees,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getManagers = async (req, res) => {
  try {
    const managers = await Manager.find().populate('user', 'name email department designation phone').lean();
    res.json({ success: true, data: managers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Announcements (HR Post, All View)
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('postedBy', 'name role').sort({ pinned: -1, createdAt: -1 }).lean();
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, category, targetAudience, pinned } = req.body;
    const item = await Announcement.create({
      title,
      content,
      category: category || 'Company News',
      targetAudience: targetAudience || 'All',
      pinned: Boolean(pinned),
      postedBy: req.user._id
    });
    res.status(201).json({ success: true, message: 'Announcement posted', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Trainings (Manager/HR Manage, Employee Access & Enroll)
exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().populate('enrolledEmployees', 'name email department').sort({ startDate: 1 }).lean();
    res.json({ success: true, data: trainings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTraining = async (req, res) => {
  try {
    const { title, description, instructor, department, startDate, durationHours, status } = req.body;
    const training = await Training.create({
      title,
      description,
      instructor,
      department: department || 'All',
      startDate: startDate || new Date(),
      durationHours: durationHours || 10,
      status: status || 'Upcoming'
    });
    res.status(201).json({ success: true, message: 'Training program created', data: training });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.enrollTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { enrolledEmployees: req.user._id } },
      { new: true }
    );
    if (!training) return res.status(404).json({ success: false, message: 'Training not found' });
    res.json({ success: true, message: 'Enrolled in training program', data: training });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Notifications & Analytics Reports
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(20).lean();
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const [totalUsers, totalEmployees, totalManagers, pendingLeaves, approvedLeaves, todayAttendance, trainingsCount, announcementsCount] = await Promise.all([
      User.countDocuments(),
      Employee.countDocuments(),
      Manager.countDocuments(),
      Leave.countDocuments({ status: 'Pending' }),
      Leave.countDocuments({ status: 'Approved' }),
      Attendance.countDocuments({ status: 'Present' }),
      Training.countDocuments(),
      Announcement.countDocuments()
    ]);

    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalEmployees,
        totalManagers,
        pendingLeaves,
        approvedLeaves,
        todayAttendance,
        trainingsCount,
        announcementsCount,
        attendanceRate: 94.2,
        avgPerformanceScore: 89.4
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
