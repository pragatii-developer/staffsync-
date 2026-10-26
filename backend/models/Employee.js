const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    employeeCode: { type: String, required: true, unique: true, index: true },
    department: { type: String, required: true, index: true },
    designation: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    dateOfJoining: { type: Date, default: Date.now },
    salary: { type: Number, default: 75000 },
    skills: [{ type: String }],
    performanceScore: { type: Number, min: 0, max: 100, default: 88 },
    leaveBalance: {
      casual: { type: Number, default: 12 },
      sick: { type: Number, default: 10 },
      earned: { type: Number, default: 15 }
    },
    address: { type: String, default: 'Indore, Madhya Pradesh, India' },
    emergencyContact: { type: String, default: '+91 9123456780' }
  },
  { timestamps: true }
);

employeeSchema.index({ department: 1, performanceScore: -1 });

module.exports = mongoose.model('Employee', employeeSchema);
