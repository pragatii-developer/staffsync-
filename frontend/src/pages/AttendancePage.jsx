import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendanceRecord } from '../store/hrmSlice';

const AttendancePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { attendance } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('Present');
  const [notes, setNotes] = useState('');

  const handleCheckIn = (e) => {
    e.preventDefault();
    dispatch(
      markAttendanceRecord({
        name: user?.name || 'Parth Dubey',
        department: user?.department || 'Engineering',
        status,
        notes
      })
    );
    setNotes('');
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">Attendance Tracking & Daily Check-In</h3>
        <p className="opacity-75 mb-0">Log daily attendance, remote work status, and review historical shift logs.</p>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Mark Today's Attendance</h5>
            <form onSubmit={handleCheckIn}>
              <div className="mb-2">
                <label className="small fw-semibold">Employee</label>
                <input className="form-control" value={user?.name || ''} disabled />
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Work Mode / Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Present">Present (Office)</option>
                  <option value="Remote">Remote (Work From Home)</option>
                  <option value="Half-Day">Half-Day</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="small fw-semibold">Sprint / Shift Notes</label>
                <input className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Working on API optimization" />
              </div>
              <button type="submit" className="btn-brand w-100">⏱️ Punch Check-In Now</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Organization Attendance Logs (Paginated View)</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((att) => (
                    <tr key={att._id}>
                      <td>{att.date}</td>
                      <td className="fw-semibold">{att.name}</td>
                      <td>{att.department}</td>
                      <td>{att.checkIn}</td>
                      <td>{att.checkOut}</td>
                      <td>{att.workHours} hrs</td>
                      <td>
                        <span className={`badge ${att.status === 'Present' ? 'bg-success' : 'bg-info text-dark'}`}>
                          {att.status}
                        </span>
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

export default AttendancePage;
