const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    checkIn: { type: String, required: true },
    checkOut: { type: String, default: '' },
    status: { type: String, enum: ['Present', 'Late', 'Remote', 'Half-Day', 'Absent'], default: 'Present', index: true },
    workHours: { type: Number, default: 8.5 },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

attendanceSchema.index({ user: 1, date: -1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
