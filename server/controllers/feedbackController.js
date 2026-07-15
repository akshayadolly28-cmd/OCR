const Feedback = require('../models/Feedback');

exports.addFeedback = async (req, res, next) => {
  try {
    const { complaintId, rating, comment } = req.body;
    const feedback = await Feedback.create({ complaintId, userId: req.user._id, rating, comment });
    res.status(201).json({ feedback });
  } catch (err) {
    next(err);
  }
};

exports.getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({ complaintId: req.params.complaintId }).populate('userId', 'name email');
    res.json({ feedbacks });
  } catch (err) {
    next(err);
  }
};
