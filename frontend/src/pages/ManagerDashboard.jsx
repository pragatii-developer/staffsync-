import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reviewLeaveRequest } from '../store/hrmSlice';

const ManagerDashboard = () => {
  const { employees, leaves, trainings, attendance } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();

  const handleDecision = (id, status) => {
    dispatch(reviewLeaveRequest({ id, status, reviewerComment: `${status} by Engineering Manager` }));
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">Manager Team & Performance Dashboard</h3>
        <p className="opacity-75 mb-0">Manage team members, approve leave requests, monitor performance, and oversee trainings.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-box">
          <div className="small opacity-75">Team Members Supervised</div>
          <div className="kpi-value">{employees.length}</div>
          <div className="small opacity-75">Engineering & Product Squad</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Pending Leave Reviews</div>
          <div className="kpi-value">{leaves.filter((l) => l.status === 'Pending').length}</div>
          <div className="small opacity-75">Requires Manager Action</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Avg Team Performance</div>
          <div className="kpi-value">92.8%</div>
          <div className="small opacity-75">Q4 Sprint Velocity Rating</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Team Attendance Today</div>
          <div className="kpi-value">{attendance.length} Logged</div>
          <div className="small opacity-75">Real-Time Shift Tracking</div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Team Leave Approval Queue</h5>
            {leaves.map((lv) => (
              <div key={lv._id} className="p-3 mb-2 rounded border border-secondary border-opacity-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <div className="fw-bold">{lv.employeeName} — <span className="text-info">{lv.leaveType}</span></div>
                  <div className="small opacity-75">{lv.startDate} to {lv.endDate} ({lv.days} days) · "{lv.reason}"</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge ${lv.status === 'Approved' ? 'bg-success' : lv.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                    {lv.status}
                  </span>
                  {lv.status === 'Pending' && (
                    <>
                      <button onClick={() => handleDecision(lv._id, 'Approved')} className="btn btn-sm btn-success">Approve</button>
                      <button onClick={() => handleDecision(lv._id, 'Rejected')} className="btn btn-sm btn-outline-danger">Reject</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Team Performance & Skill Matrix</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Member</th>
                    <th>Role</th>
                    <th>Performance KPI</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td><code>{emp.employeeCode}</code></td>
                      <td className="fw-semibold">{emp.name}</td>
                      <td className="small">{emp.designation}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{ height: '8px' }}>
                            <div className="progress-bar bg-success" style={{ width: `${emp.performanceScore}%` }} />
                          </div>
                          <span className="small fw-bold">{emp.performanceScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
