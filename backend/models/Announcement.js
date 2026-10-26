const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Company News', 'Policy Update', 'Holiday', 'Event', 'Urgent'], default: 'Company News', index: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetAudience: { type: String, enum: ['All', 'Employees', 'Managers', 'HR'], default: 'All' },
    pinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

announcementSchema.index({ pinned: -1, createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
