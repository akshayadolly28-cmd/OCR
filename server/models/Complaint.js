const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    category: { type: String, index: true },
    attachment: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
      default: 'Pending',
      index: true,
    },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium', index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  },
  { timestamps: true }
);

complaintSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Complaint', complaintSchema);
