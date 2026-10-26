import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../store/authSlice';

const EmployeeProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    department: user?.department || '',
    designation: user?.designation || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || ''
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">Employee Profile & Personal Records</h3>
        <p className="opacity-75 mb-0">View and update your personal details, emergency contacts, and skill certifications.</p>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="ui-card text-center">
            <div
              className="mx-auto mb-3 d-grid"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #10b981)',
                color: '#fff',
                placeItems: 'center',
                fontSize: '1.75rem',
                fontWeight: 800
              }}
            >
              {user?.name?.slice(0, 2).toUpperCase()}
            </div>
            <h5 className="fw-bold mb-1">{user?.name}</h5>
            <p className="small opacity-75 mb-2">{user?.designation} · {user?.department}</p>
            <span className="badge-role">{user?.role} Access Level</span>
            <hr />
            <div className="text-start small">
              <div className="mb-1"><strong>Email:</strong> {user?.email}</div>
              <div className="mb-1"><strong>Phone:</strong> {user?.phone}</div>
              <div className="mb-1"><strong>Address:</strong> {user?.address}</div>
              <div className="mt-2">
                <strong>Verified Skills:</strong>
                <div className="d-flex flex-wrap gap-1 mt-1">
                  {(user?.skills || ['React.js', 'Node.js', 'MongoDB', 'JWT']).map((s) => (
                    <span key={s} className="badge bg-secondary">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Update Personal Information</h5>
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-semibold">Full Name</label>
                  <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-semibold">Phone Number</label>
                  <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-semibold">Department</label>
                  <input className="form-control" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-semibold">Designation</label>
                  <input className="form-control" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-semibold">Residential Address</label>
                  <input className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-semibold">Emergency Contact</label>
                  <input className="form-control" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn-brand mt-3">Save Personal Records</button>
              {saved && <span className="text-success ms-3 small fw-bold">✓ Profile updated!</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
