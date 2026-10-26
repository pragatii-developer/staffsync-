const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    department: { type: String, default: 'All', index: true },
    startDate: { type: Date, required: true },
    durationHours: { type: Number, default: 12 },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Ongoing', index: true },
    enrolledEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    completionRate: { type: Number, default: 75 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Training', trainingSchema);
