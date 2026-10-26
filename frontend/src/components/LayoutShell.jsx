import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { switchRoleDemo } from '../store/authSlice';

const LayoutShell = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { demoLinks } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();

  return (
    <div className="aura-layout">
      <aside className="aura-sidebar">
        <div className="aura-brand">
          <div className="aura-brand-badge">SS</div>
          <div>
            <div>StaffSync</div>
            <div style={{ fontSize: '0.72rem', opacity: 0.7, fontWeight: 500 }}>AURA ENTERPRISE UI</div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <NavLink to="/" end className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>🏠</span> Home & Project Links
          </NavLink>
          <NavLink to="/employee-dashboard" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>👤</span> Employee Dashboard
          </NavLink>
          <NavLink to="/manager-dashboard" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>📊</span> Manager Dashboard
          </NavLink>
          <NavLink to="/hr-dashboard" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>🏢</span> HR Command Center
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>⏱️</span> Attendance Tracker
          </NavLink>
          <NavLink to="/leaves" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>🗓️</span> Leave & Kanban Workflow
          </NavLink>
          <NavLink to="/announcements" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>📢</span> Announcements Feed
          </NavLink>
          <NavLink to="/trainings" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>🎓</span> Trainings & Growth
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `aura-nav-link ${isActive ? 'active' : ''}`}>
            <span>⚙️</span> Employee Profile
          </NavLink>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1rem', fontSize: '0.8rem' }}>
          <div className="mb-2 opacity-75">Quick Role Switcher (RBAC):</div>
          <div className="d-flex gap-1">
            {['Employee', 'Manager', 'HR'].map((r) => (
              <button
                key={r}
                onClick={() => dispatch(switchRoleDemo(r))}
                className={`btn btn-sm ${user?.role === r ? 'btn-light fw-bold' : 'btn-outline-light'}`}
                style={{ fontSize: '0.72rem', flex: 1 }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="aura-main">
        <header className="aura-topbar">
          <div>
            <span className="badge-role me-2">Active Role: {user?.role}</span>
            <span className="text-muted small">Welcome back, <strong>{user?.name}</strong> ({user?.designation})</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <a href={demoLinks.liveDemoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
              🌐 Live Demo
            </a>
            <a href={demoLinks.githubRepoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              💻 GitHub Repo
            </a>
          </div>
        </header>
        <main className="aura-content">{children}</main>
      </div>
    </div>
  );
};

export default LayoutShell;
