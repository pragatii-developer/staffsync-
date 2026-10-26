const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['Employee', 'Manager', 'HR'], default: 'Employee', index: true },
    department: { type: String, default: 'Engineering', index: true },
    designation: { type: String, default: 'Software Engineer' },
    phone: { type: String, default: '+91 9876543210' },
    avatar: { type: String, default: '' },
    status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
