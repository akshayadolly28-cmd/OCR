const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
