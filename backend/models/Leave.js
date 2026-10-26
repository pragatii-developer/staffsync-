const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    leaveType: { type: String, enum: ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Work From Home'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true, default: 1 },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', index: true },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewerComment: { type: String, default: '' }
  },
  { timestamps: true }
);

leaveSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Leave', leaveSchema);
