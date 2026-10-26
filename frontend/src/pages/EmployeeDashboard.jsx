import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { attendance, leaves, announcements, trainings, notifications } = useSelector((state) => state.hrm);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div>
          <h3 className="fw-bold mb-1">Employee Self-Service Dashboard</h3>
          <p className="opacity-75 mb-0">Welcome, {user?.name} — {user?.designation} ({user?.department})</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/attendance" className="btn-brand text-decoration-none">+ Mark Attendance</Link>
          <Link to="/leaves" className="btn btn-outline-secondary">Apply Leave</Link>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-box">
          <div className="small opacity-75">Available Leave Balance</div>
          <div className="kpi-value">24 Days</div>
          <div className="small opacity-75">10 Casual · 6 Sick · 8 Earned</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Days Present (This Month)</div>
          <div className="kpi-value">21 / 22</div>
          <div className="small opacity-75">95.4% Attendance Consistency</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Enrolled Trainings</div>
          <div className="kpi-value">{trainings.filter((t) => t.enrolled).length}</div>
          <div className="small opacity-75">Active Skill Tracks</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Unread Notifications</div>
          <div className="kpi-value">{notifications.length}</div>
          <div className="small opacity-75">Real-Time Alerts</div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Recent Leave Applications</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Dates</th>
                    <th>Days</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((lv) => (
                    <tr key={lv._id}>
                      <td className="fw-semibold">{lv.leaveType}</td>
                      <td>{lv.startDate} to {lv.endDate}</td>
                      <td>{lv.days}</td>
                      <td>
                        <span className={`badge ${lv.status === 'Approved' ? 'bg-success' : lv.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                          {lv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Latest Company Announcements</h5>
            {announcements.map((ann) => (
              <div key={ann._id} className="p-2 mb-2 rounded border border-secondary border-opacity-25">
                <div className="d-flex justify-content-between">
                  <strong className="small">{ann.title}</strong>
                  <span className="badge bg-primary">{ann.category}</span>
                </div>
                <p className="small opacity-75 mb-1 mt-1">{ann.content}</p>
                <div className="small opacity-50">{ann.date} · {ann.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
