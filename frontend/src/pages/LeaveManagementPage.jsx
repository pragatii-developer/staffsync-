import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitLeaveRequest, reviewLeaveRequest } from '../store/hrmSlice';

const LeaveManagementPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { leaves } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    leaveType: 'Casual Leave',
    startDate: '2026-11-15',
    endDate: '2026-11-16',
    days: 2,
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.reason) return;
    dispatch(
      submitLeaveRequest({
        employeeName: user?.name || 'Parth Dubey',
        department: user?.department || 'Engineering',
        ...form
      })
    );
    setForm({ ...form, reason: '' });
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">Leave Management & Kanban Workflow</h3>
        <p className="opacity-75 mb-0">Apply for leaves, view approval status across Kanban stages, and manage team requests.</p>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Apply for Leave</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="small fw-semibold">Leave Category</label>
                <select className="form-select" value={form.leaveType} onChange={(e) => setForm({ ...form, leaveType: e.target.value })}>
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                  <option>Work From Home</option>
                </select>
              </div>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="small fw-semibold">Start Date</label>
                  <input type="date" className="form-control" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="small fw-semibold">End Date</label>
                  <input type="date" className="form-control" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Total Days</label>
                <input type="number" min="1" max="30" className="form-control" value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} />
              </div>
              <div className="mb-3">
                <label className="small fw-semibold">Reason for Leave</label>
                <textarea className="form-control" rows="2" required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="State reason clearly..." />
              </div>
              <button type="submit" className="btn-brand w-100">Submit Leave Request</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="row g-3">
            {['Pending', 'Approved', 'Rejected'].map((colStatus) => (
              <div className="col-md-4" key={colStatus}>
                <div className="ui-card h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">{colStatus}</h6>
                    <span className="badge bg-secondary">{leaves.filter((l) => l.status === colStatus).length}</span>
                  </div>
                  {leaves
                    .filter((l) => l.status === colStatus)
                    .map((lv) => (
                      <div key={lv._id} className="p-2 mb-2 rounded border border-secondary border-opacity-25">
                        <div className="fw-bold small">{lv.employeeName}</div>
                        <div className="badge bg-info text-dark my-1">{lv.leaveType} ({lv.days}d)</div>
                        <div className="small opacity-75">{lv.startDate} → {lv.endDate}</div>
                        <div className="small fst-italic mt-1">"{lv.reason}"</div>
                        {(user?.role === 'Manager' || user?.role === 'HR') && lv.status === 'Pending' && (
                          <div className="d-flex gap-1 mt-2">
                            <button onClick={() => dispatch(reviewLeaveRequest({ id: lv._id, status: 'Approved' }))} className="btn btn-sm btn-success flex-grow-1">Approve</button>
                            <button onClick={() => dispatch(reviewLeaveRequest({ id: lv._id, status: 'Rejected' }))} className="btn btn-sm btn-outline-danger flex-grow-1">Reject</button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementPage;
