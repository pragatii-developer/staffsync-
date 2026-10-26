# StaffSync Aura (Indigo Enterprise Sidebar UI)
**StaffSync — Modern Human Resource Management Solution (MERN Stack)**

## Mentor Review Links
- **Live Demo Link**: `https://staffsync-hrm-demo.vercel.app` (Editable directly from the Home Page UI!)
- **GitHub Repository Link**: `https://github.com/Parth07072006/StaffSync-HRM-MERN`

## Requirements Satisfaction Checklist (`staff (1).txt`)
1. **Environment Setup**:
   - **Backend**: Node.js, Express.js, MongoDB & Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`
   - **Frontend**: React.js, Axios, React Router, Redux Toolkit (`@reduxjs/toolkit`), Bootstrap 5 & Material UI
2. **Database Collections (`backend/models/`)**:
   - `Users`, `Employees`, `Managers`, `Attendance`, `Leaves`, `Announcements`, `Trainings`, `Notifications`
3. **Core Modules**:
   - **Employee**: Register/Login, Manage Profile, Mark Attendance, Apply for Leave, View Leave Status, View Announcements, Access Training Programs, Update Personal Information
   - **Manager**: Manage Team Members, Review Leave Requests, Approve/Reject Leaves, Manage Training Programs, Monitor Employee Performance, View Team Attendance
   - **HR**: Manage Employees, Manage Managers, Track Attendance, Manage Leave Requests, Post Announcements, View Reports & Analytics
4. **Security**:
   - JWT Authentication, Password Hashing (`bcryptjs`), Role-Based Access Control (`authorizeRoles`), Protected Routes, Input Validation, Secure Data Management
5. **User Interface**:
   - Home Page, Employee Profile Page, Attendance Page, Leave Management Page (with Kanban), Announcements Page, Employee Dashboard, Manager Dashboard, HR Dashboard, Responsive Design
6. **Testing**:
   - Run `cd backend && npm test` to execute Authentication, Attendance, Leave, Employee, and Dashboard tests.
7. **Optimization**:
   - Compound Database Indexing, React `lazy()` & `Suspense` Lazy Loading, API Pagination, Performance Monitoring Middleware.

## Quick Start
```bash
# 1. Start Backend
cd backend
npm install
npm test
npm run dev

# 2. Start Frontend
cd ../frontend
npm install
npm run dev
```
