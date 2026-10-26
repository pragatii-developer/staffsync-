const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendance,
  applyLeave,
  getLeaves,
  updateLeaveStatus,
  getEmployees,
  getManagers,
  getAnnouncements,
  createAnnouncement,
  getTrainings,
  createTraining,
  enrollTraining,
  getNotifications,
  getDashboardAnalytics
} = require('../controllers/hrmController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');

// Attendance
router.post('/attendance', protect, markAttendance);
router.get('/attendance', protect, getAttendance);

// Leaves
router.post('/leaves', protect, validateBody(['leaveType', 'startDate', 'endDate', 'reason']), applyLeave);
router.get('/leaves', protect, getLeaves);
router.patch('/leaves/:id/status', protect, authorizeRoles('Manager', 'HR'), validateBody(['status']), updateLeaveStatus);

// Employees & Managers
router.get('/employees', protect, authorizeRoles('Manager', 'HR'), getEmployees);
router.get('/managers', protect, authorizeRoles('HR'), getManagers);

// Announcements
router.get('/announcements', protect, getAnnouncements);
router.post('/announcements', protect, authorizeRoles('HR'), validateBody(['title', 'content']), createAnnouncement);

// Trainings
router.get('/trainings', protect, getTrainings);
router.post('/trainings', protect, authorizeRoles('Manager', 'HR'), validateBody(['title', 'description', 'instructor']), createTraining);
router.post('/trainings/:id/enroll', protect, enrollTraining);

// Notifications & Analytics
router.get('/notifications', protect, getNotifications);
router.get('/analytics', protect, getDashboardAnalytics);

module.exports = router;
