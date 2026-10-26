import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateDemoLinks } from '../store/hrmSlice';

const HomePage = () => {
  const { demoLinks, employees, leaves, attendance, trainings } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();
  const [liveDemoUrl, setLiveDemoUrl] = useState(demoLinks.liveDemoUrl);
  const [githubRepoUrl, setGithubRepoUrl] = useState(demoLinks.githubRepoUrl);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveLinks = (e) => {
    e.preventDefault();
    dispatch(updateDemoLinks({ liveDemoUrl, githubRepoUrl }));
    setSavedMsg('Demo and GitHub links updated for mentor evaluation!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  return (
    <div>
      <div className="ui-card mb-4">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge-role mb-2 d-inline-block">
              UI Variant 1 — Aura Indigo Enterprise Layout
            </span>
            <h1 className="fw-bold mb-2">StaffSync — Modern Human Resource Management Solution</h1>
            <p className="opacity-75 mb-3">
              Comprehensive MERN Stack (MongoDB, Express.js, React.js, Node.js) platform with JWT Role-Based Access Control
              for HR Personnel, Managers, and Employees. Streamline employee records, attendance tracking, leave workflows,
              training programs, and real-time announcements.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/hr-dashboard" className="btn-brand text-decoration-none">Explore HR Dashboard</Link>
              <Link to="/manager-dashboard" className="btn btn-outline-secondary">Manager Workspace</Link>
              <Link to="/employee-dashboard" className="btn btn-outline-secondary">Employee Self-Service</Link>
              <Link to="/login" className="btn btn-outline-secondary">JWT Login / Register</Link>
            </div>
          </div>
          <div className="col-lg-4 mt-3 mt-lg-0">
            <div className="ui-card mb-0">
              <h6 className="fw-bold mb-2">🔗 Mentor Evaluation: Demo & GitHub Links</h6>
              <form onSubmit={handleSaveLinks}>
                <div className="mb-2">
                  <label className="small fw-semibold">Live Demo URL</label>
                  <input className="form-control form-control-sm" value={liveDemoUrl} onChange={(e) => setLiveDemoUrl(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="small fw-semibold">GitHub Repository URL</label>
                  <input className="form-control form-control-sm" value={githubRepoUrl} onChange={(e) => setGithubRepoUrl(e.target.value)} />
                </div>
                <button type="submit" className="btn-brand w-100 btn-sm">Update Project Links</button>
                {savedMsg && <div className="text-success small mt-2 fw-semibold">{savedMsg}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-box">
          <div className="small opacity-75">Active Workforce</div>
          <div className="kpi-value">{employees.length}</div>
          <div className="small opacity-75 mt-1">Across 4 Core Departments</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Attendance Logged Today</div>
          <div className="kpi-value">{attendance.length}</div>
          <div className="small opacity-75 mt-1">94.2% On-Time Check-in Rate</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Leave Requests Tracked</div>
          <div className="kpi-value">{leaves.length}</div>
          <div className="small opacity-75 mt-1">Automated Multi-Role Workflow</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Active Training Programs</div>
          <div className="kpi-value">{trainings.length}</div>
          <div className="small opacity-75 mt-1">Continuous Skill Development</div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="ui-card h-100">
            <h5 className="fw-bold">👨‍💻 Employee Module</h5>
            <ul className="small opacity-85 mb-0">
              <li>JWT Register, Login & Role Protection</li>
              <li>Manage Profile & Personal Records</li>
              <li>Daily Attendance Check-In / Check-Out</li>
              <li>Apply for Leave & Track Live Approval Status</li>
              <li>Access Company Announcements & Trainings</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ui-card h-100">
            <h5 className="fw-bold">📈 Manager Module</h5>
            <ul className="small opacity-85 mb-0">
              <li>Oversee Assigned Department Team Members</li>
              <li>Review, Approve, or Reject Leave Requests</li>
              <li>Launch & Track Team Training Programs</li>
              <li>Monitor Employee Performance Metrics</li>
              <li>View Real-Time Team Attendance Logs</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ui-card h-100">
            <h5 className="fw-bold">🏛️ HR Administration</h5>
            <ul className="small opacity-85 mb-0">
              <li>Full Employee & Manager Directory Control</li>
              <li>Organization-Wide Attendance Auditing</li>
              <li>Final Leave Policy & Escalation Management</li>
              <li>Publish Pinned Company Announcements</li>
              <li>Executive Reports, KPIs & Department Analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
