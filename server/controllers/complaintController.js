const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, priority } = req.body;
    const attachment = req.file ? `/uploads/${req.file.filename}` : undefined;
    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      attachment,
      userId: req.user._id,
    });
    res.status(201).json({ complaint });
  } catch (err) {
    next(err);
  }
};

exports.getUserComplaints = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = {};
    if (req.user.role === 'USER') query.userId = req.user._id;
    else if (req.query.userId) query.userId = req.query.userId;

    const total = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email')
      .populate('agentId', 'name email');
    res.json({ total, page, limit, complaints });
  } catch (err) {
    next(err);
  }
};

exports.getComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('agentId', 'name email phone');
    if (!complaint) return res.status(404).json({ message: 'Not found' });
    res.json({ complaint });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Not found' });
    complaint.status = status;
    if (req.body.agentId) complaint.agentId = req.body.agentId;
    await complaint.save();
    res.json({ complaint });
  } catch (err) {
    next(err);
  }
};

exports.assignAgent = async (req, res, next) => {
  try {
    const { agentId } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Not found' });
    complaint.agentId = agentId;
    complaint.status = 'Assigned';
    await complaint.save();
    res.json({ complaint });
  } catch (err) {
    next(err);
  }
};

exports.updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Not found' });
    if (req.body.title) complaint.title = req.body.title;
    if (req.body.description) complaint.description = req.body.description;
    if (req.body.priority) complaint.priority = req.body.priority;
    await complaint.save();
    res.json({ complaint });
  } catch (err) {
    next(err);
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
