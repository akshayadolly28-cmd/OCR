const Chat = require('../models/Chat');

exports.addMessage = async (req, res, next) => {
  try {
    const { complaintId, message } = req.body;
    const chat = await Chat.create({ complaintId, senderId: req.user._id, message });
    res.status(201).json({ chat });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Chat.find({ complaintId: req.params.complaintId }).sort({ timestamp: 1 }).populate('senderId', 'name role');
    res.json({ messages });
  } catch (err) {
    next(err);
  }
};
