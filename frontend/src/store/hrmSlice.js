import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  demoLinks: {
    liveDemoUrl: 'https://staffsync-hrm-demo.vercel.app',
    githubRepoUrl: 'https://github.com/Parth07072006/StaffSync-HRM-MERN'
  },
  employees: [
    { _id: 'emp-101', employeeCode: 'EMP-1041', name: 'Parth Dubey', email: 'parth.dubey@staffsync.io', role: 'Employee', department: 'Engineering', designation: 'Full Stack MERN Developer', performanceScore: 95, status: 'Active', salary: 95000 },
    { _id: 'emp-102', employeeCode: 'EMP-1042', name: 'Ishita Nair', email: 'ishita.nair@staffsync.io', role: 'Employee', department: 'Product Design', designation: 'Senior UI/UX Designer', performanceScore: 91, status: 'Active', salary: 88000 },
    { _id: 'emp-103', employeeCode: 'EMP-1043', name: 'Kabir Deshmukh', email: 'kabir.d@staffsync.io', role: 'Employee', department: 'Engineering', designation: 'Backend Node.js Engineer', performanceScore: 89, status: 'Active', salary: 92000 },
    { _id: 'emp-104', employeeCode: 'EMP-1044', name: 'Meera Joshi', email: 'meera.joshi@staffsync.io', role: 'Employee', department: 'Quality Assurance', designation: 'Automation QA Lead', performanceScore: 93, status: 'On Leave', salary: 82000 },
    { _id: 'emp-105', employeeCode: 'EMP-1045', name: 'Rohan Kulkarni', email: 'rohan.manager@staffsync.io', role: 'Manager', department: 'Engineering', designation: 'Engineering Manager', performanceScore: 96, status: 'Active', salary: 135000 }
  ],
  managers: [
    { _id: 'mgr-201', managerCode: 'MGR-201', name: 'Rohan Kulkarni', email: 'rohan.manager@staffsync.io', department: 'Engineering', teamSize: 8, projectsManaged: 5, teamRating: 4.8 },
    { _id: 'mgr-202', managerCode: 'MGR-202', name: 'Neha Choudhary', email: 'neha.mgr@staffsync.io', department: 'Product Design', teamSize: 5, projectsManaged: 3, teamRating: 4.7 }
  ],
  attendance: [
    { _id: 'att-1', date: '2026-10-26', name: 'Parth Dubey', department: 'Engineering', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'Present', workHours: 9.2 },
    { _id: 'att-2', date: '2026-10-26', name: 'Ishita Nair', department: 'Product Design', checkIn: '09:14 AM', checkOut: '06:05 PM', status: 'Present', workHours: 8.8 },
    { _id: 'att-3', date: '2026-10-26', name: 'Kabir Deshmukh', department: 'Engineering', checkIn: '09:30 AM', checkOut: '06:30 PM', status: 'Remote', workHours: 9.0 },
    { _id: 'att-4', date: '2026-10-25', name: 'Parth Dubey', department: 'Engineering', checkIn: '08:58 AM', checkOut: '06:10 PM', status: 'Present', workHours: 9.2 }
  ],
  leaves: [
    { _id: 'lv-1', employeeName: 'Parth Dubey', department: 'Engineering', leaveType: 'Casual Leave', startDate: '2026-11-04', endDate: '2026-11-05', days: 2, reason: 'Family festival celebration in Indore', status: 'Approved', reviewerComment: 'Approved by Rohan Kulkarni' },
    { _id: 'lv-2', employeeName: 'Meera Joshi', department: 'Quality Assurance', leaveType: 'Sick Leave', startDate: '2026-10-26', endDate: '2026-10-27', days: 2, reason: 'Medical checkup and recovery', status: 'Pending', reviewerComment: '' },
    { _id: 'lv-3', employeeName: 'Kabir Deshmukh', department: 'Engineering', leaveType: 'Work From Home', startDate: '2026-11-10', endDate: '2026-11-12', days: 3, reason: 'Home broadband upgrade & sprint focus', status: 'Pending', reviewerComment: '' }
  ],
  announcements: [
    { _id: 'ann-1', title: 'Diwali Bonus & Annual Festival Schedule Announced', content: 'All full-time employees will receive the Q4 performance bonus along with the October payroll cycle.', category: 'Company News', targetAudience: 'All', pinned: true, date: '2026-10-25', author: 'Ananya Verma (HR)' },
    { _id: 'ann-2', title: 'Updated Hybrid Work & Attendance Policy 2026', content: 'Employees can log up to 8 Remote workdays per quarter directly through the StaffSync Attendance module.', category: 'Policy Update', targetAudience: 'All', pinned: false, date: '2026-10-22', author: 'Ananya Verma (HR)' },
    { _id: 'ann-3', title: 'MERN Stack Security & JWT Best Practices Workshop', content: 'Mandatory engineering session on RBAC, MongoDB indexing, and OWASP API security.', category: 'Event', targetAudience: 'Employees', pinned: false, date: '2026-10-20', author: 'Rohan Kulkarni (Manager)' }
  ],
  trainings: [
    { _id: 'trn-1', title: 'Advanced MERN Stack & Microservices Scaling', instructor: 'Rohan Kulkarni', department: 'Engineering', startDate: '2026-11-02', durationHours: 16, status: 'Upcoming', completionRate: 85, enrolled: true },
    { _id: 'trn-2', title: 'Enterprise Security: JWT, RBAC & Data Protection', instructor: 'Siddharth Mehta', department: 'All', startDate: '2026-10-18', durationHours: 10, status: 'Ongoing', completionRate: 78, enrolled: true },
    { _id: 'trn-3', title: 'Executive Leadership & Agile Sprint Estimation', instructor: 'Ananya Verma', department: 'Management', startDate: '2026-11-12', durationHours: 8, status: 'Upcoming', completionRate: 92, enrolled: false }
  ],
  notifications: [
    { _id: 'nt-1', title: 'Leave Request Approved', message: 'Your Casual Leave (Nov 4 - Nov 5) was approved.', type: 'Leave', isRead: false },
    { _id: 'nt-2', title: 'New Announcement Posted', message: 'Diwali Bonus & Annual Festival Schedule Announced.', type: 'Announcement', isRead: false }
  ]
};

const hrmSlice = createSlice({
  name: 'hrm',
  initialState,
  reducers: {
    updateDemoLinks: (state, action) => {
      state.demoLinks = { ...state.demoLinks, ...action.payload };
    },
    markAttendanceRecord: (state, action) => {
      state.attendance.unshift({
        _id: `att-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkOut: 'Active Session',
        workHours: 8.5,
        ...action.payload
      });
    },
    submitLeaveRequest: (state, action) => {
      state.leaves.unshift({
        _id: `lv-${Date.now()}`,
        status: 'Pending',
        reviewerComment: '',
        ...action.payload
      });
    },
    reviewLeaveRequest: (state, action) => {
      const { id, status, reviewerComment } = action.payload;
      const item = state.leaves.find((l) => l._id === id);
      if (item) {
        item.status = status;
        item.reviewerComment = reviewerComment || `Marked ${status}`;
      }
    },
    addEmployeeRecord: (state, action) => {
      state.employees.unshift({
        _id: `emp-${Date.now()}`,
        employeeCode: `EMP-${Math.floor(1050 + Math.random() * 900)}`,
        performanceScore: 90,
        status: 'Active',
        ...action.payload
      });
    },
    postAnnouncementItem: (state, action) => {
      state.announcements.unshift({
        _id: `ann-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...action.payload
      });
    },
    addTrainingProgram: (state, action) => {
      state.trainings.unshift({
        _id: `trn-${Date.now()}`,
        completionRate: 0,
        enrolled: true,
        ...action.payload
      });
    },
    toggleTrainingEnroll: (state, action) => {
      const item = state.trainings.find((t) => t._id === action.payload);
      if (item) item.enrolled = !item.enrolled;
    }
  }
});

export const {
  updateDemoLinks,
  markAttendanceRecord,
  submitLeaveRequest,
  reviewLeaveRequest,
  addEmployeeRecord,
  postAnnouncementItem,
  addTrainingProgram,
  toggleTrainingEnroll
} = hrmSlice.actions;

export default hrmSlice.reducer;
