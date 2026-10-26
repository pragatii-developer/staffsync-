import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { switchRoleDemo, loginSuccess } from '../store/authSlice';

const LoginRegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Parth Dubey');
  const [email, setEmail] = useState('parth.dubey@staffsync.io');
  const [password, setPassword] = useState('Password@123');
  const [role, setRole] = useState('Employee');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(
        loginSuccess({
          user: { _id: `u-${Date.now()}`, name, email, role, department: 'Engineering', designation: `${role} Member` },
          token: 'jwt-token-staffsync'
        })
      );
    } else {
      dispatch(switchRoleDemo(role));
    }
    navigate(role === 'HR' ? '/hr-dashboard' : role === 'Manager' ? '/manager-dashboard' : '/employee-dashboard');
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 col-lg-5">
        <div className="ui-card">
          <h4 className="fw-bold mb-1">{isRegister ? 'Create StaffSync Account' : 'Sign In to StaffSync HRM'}</h4>
          <p className="small opacity-75 mb-3">Secured with JWT Authentication, bcryptjs Password Hashing & RBAC</p>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-2">
                <label className="small fw-semibold">Full Name</label>
                <input className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div className="mb-2">
              <label className="small fw-semibold">Email Address</label>
              <input className="form-control" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-2">
              <label className="small fw-semibold">Password</label>
              <input className="form-control" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="small fw-semibold">Select Role (RBAC Access Level)</label>
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR Administrator</option>
              </select>
            </div>
            <button type="submit" className="btn-brand w-100 mb-2">
              {isRegister ? 'Register & Continue' : 'Login with JWT'}
            </button>
          </form>

          <button onClick={() => setIsRegister(!isRegister)} className="btn btn-link btn-sm w-100 text-decoration-none">
            {isRegister ? 'Already have an account? Sign In' : 'New employee? Register an account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
