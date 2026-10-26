const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    managerCode: { type: String, required: true, unique: true, index: true },
    department: { type: String, required: true, index: true },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    projectsManaged: { type: Number, default: 4 },
    teamRating: { type: Number, default: 4.7 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Manager', managerSchema);
