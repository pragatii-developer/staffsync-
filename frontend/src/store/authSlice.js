import { createSlice } from '@reduxjs/toolkit';

const defaultUsers = {
  HR: {
    _id: 'u-hr-01',
    name: 'Ananya Verma',
    email: 'ananya.hr@staffsync.io',
    role: 'HR',
    department: 'Human Resources',
    designation: 'VP of People Operations',
    phone: '+91 98260 11223',
    address: 'Vijay Nagar, Indore, MP',
    emergencyContact: '+91 98260 99887',
    skills: ['People Analytics', 'Talent Acquisition', 'Policy Design', 'HRIS']
  },
  Manager: {
    _id: 'u-mgr-01',
    name: 'Rohan Kulkarni',
    email: 'rohan.manager@staffsync.io',
    role: 'Manager',
    department: 'Engineering',
    designation: 'Engineering Manager',
    phone: '+91 98260 44556',
    address: 'Palasia Square, Indore, MP',
    emergencyContact: '+91 98260 33221',
    skills: ['System Architecture', 'Agile Delivery', 'Team Mentorship', 'MERN Stack']
  },
  Employee: {
    _id: 'u-emp-01',
    name: 'Parth Dubey',
    email: 'parth.dubey@staffsync.io',
    role: 'Employee',
    department: 'Engineering',
    designation: 'Full Stack MERN Developer',
    phone: '+91 98260 77889',
    address: 'Rau, Indore, Madhya Pradesh',
    emergencyContact: '+91 98260 66554',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'JWT']
  }
};

const initialState = {
  user: defaultUsers.HR,
  token: 'demo-jwt-token-staffsync-2026',
  isAuthenticated: true,
  demoProfiles: defaultUsers
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    switchRoleDemo: (state, action) => {
      const role = action.payload;
      if (state.demoProfiles[role]) {
        state.user = state.demoProfiles[role];
        state.isAuthenticated = true;
      }
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (state.user.role && state.demoProfiles[state.user.role]) {
        state.demoProfiles[state.user.role] = state.user;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const { loginSuccess, switchRoleDemo, updateUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
