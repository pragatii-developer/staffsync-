import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployeeRecord } from '../store/hrmSlice';

const HRDashboard = () => {
  const { employees, managers, leaves, attendance, announcements } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', department: 'Engineering', designation: 'Software Engineer', salary: 85000 });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    dispatch(addEmployeeRecord(form));
    setForm({ name: '', email: '', department: 'Engineering', designation: 'Software Engineer', salary: 85000 });
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">HR Executive Command & Analytics Dashboard</h3>
        <p className="opacity-75 mb-0">Manage employees, oversee managers, track organization attendance, leaves, and analytics.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-box">
          <div className="small opacity-75">Total Employees</div>
          <div className="kpi-value">{employees.length}</div>
          <div className="small opacity-75">100% Verified Records</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Department Managers</div>
          <div className="kpi-value">{managers.length}</div>
          <div className="small opacity-75">Active Team Leads</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Active Announcements</div>
          <div className="kpi-value">{announcements.length}</div>
          <div className="small opacity-75">Organization Broadcasts</div>
        </div>
        <div className="kpi-box">
          <div className="small opacity-75">Monthly Payroll Estimate</div>
          <div className="kpi-value">₹{(employees.reduce((acc, e) => acc + Number(e.salary || 80000), 0) / 100000).toFixed(2)}L</div>
          <div className="small opacity-75">Automated Salary Ledger</div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Employee Directory & Records Management</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Status</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td><code>{emp.employeeCode}</code></td>
                      <td>
                        <div className="fw-bold">{emp.name}</div>
                        <div className="small opacity-75">{emp.email}</div>
                      </td>
                      <td>{emp.department}</td>
                      <td>{emp.designation}</td>
                      <td>
                        <span className={`badge ${emp.status === 'Active' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="fw-bold">{emp.performanceScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ui-card">
            <h5 className="fw-bold mb-3">Department Managers Overview</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Manager Code</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Team Size</th>
                    <th>Projects</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map((m) => (
                    <tr key={m._id}>
                      <td><code>{m.managerCode}</code></td>
                      <td className="fw-semibold">{m.name}</td>
                      <td>{m.department}</td>
                      <td>{m.teamSize} Members</td>
                      <td>{m.projectsManaged} Active</td>
                      <td>⭐ {m.teamRating} / 5.0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Onboard New Employee</h5>
            <form onSubmit={handleAddEmployee}>
              <div className="mb-2">
                <label className="small fw-semibold">Full Name</label>
                <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aditya Raj" />
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Official Email</label>
                <input className="form-control" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="aditya@staffsync.io" />
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Department</label>
                <select className="form-select" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                  <option>Engineering</option>
                  <option>Product Design</option>
                  <option>Quality Assurance</option>
                  <option>Human Resources</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Designation</label>
                <input className="form-control" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="small fw-semibold">Monthly Salary (₹)</label>
                <input className="form-control" type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
              </div>
              <button type="submit" className="btn-brand w-100">+ Register Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
