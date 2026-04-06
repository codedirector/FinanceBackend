// const Record = require('../models/Record');

// exports.createRecord = async (req, res) => {
//   try {
//     const { amount, type, category, date, notes } = req.body;
//     if (!amount || !type || !category || !date) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const record = await Record.create({
//       amount,
//       type,
//       category,
//       date,
//       notes,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({ message: 'Record created successfully', record });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getAllRecords = async (req, res) => {
//   try {
//     const { type, category, startDate, endDate } = req.query;
//     const filter = {};

//     if (type) filter.type = type;
//     if (category) filter.category = category;
//     if (startDate || endDate) {
//       filter.date = {};
//       if (startDate) filter.date.$gte = new Date(startDate);
//       if (endDate) filter.date.$lte = new Date(endDate);
//     }

//     const records = await Record.find(filter)
//       .populate('createdBy', 'name email role')
//       .sort({ date: -1 });

//     res.json(records);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getRecordById = async (req, res) => {
//   try {
//     const record = await Record.findById(req.params.id).populate('createdBy', 'name email role');
//     if (!record) return res.status(404).json({ message: 'Record not found' });

//     res.json(record);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateRecord = async (req, res) => {
//   try {
//     const { amount, type, category, date, notes } = req.body;
//     const record = await Record.findById(req.params.id);

//     if (!record) return res.status(404).json({ message: 'Record not found' });

//     if (amount !== undefined) record.amount = amount;
//     if (type) record.type = type;
//     if (category) record.category = category;
//     if (date) record.date = date;
//     if (notes) record.notes = notes;

//     await record.save();

//     res.json({ message: 'Record updated successfully', record });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteRecord = async (req, res) => {
//   try {
//     const record = await Record.findByIdAndDelete(req.params.id);
//     if (!record) return res.status(404).json({ message: 'Record not found' });

//     res.json({ message: 'Record deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Record = require('../models/Record');

exports.createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id,
    });
    res.status(201).json({ message: 'Record created successfully', record });
  } catch (error) {
    next(error);
  }
};

exports.getAllRecords = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, page, limit } = req.query;
    const filter = { createdBy: req.user._id };
    if (type) filter.type = type;
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const total = await Record.countDocuments(filter);
    const records = await Record.find(filter)
      .populate('createdBy', 'name email role')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum);
    res.json({
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalRecords: total,
      records,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecordById = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id).populate('createdBy', 'name email role');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    next(error);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    if (amount !== undefined) record.amount = amount;
    if (type) record.type = type;
    if (category) record.category = category;
    if (date) record.date = date;
    if (notes) record.notes = notes;
    await record.save();
    res.json({ message: 'Record updated successfully', record });
  } catch (error) {
    next(error);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    next(error);
  }
};