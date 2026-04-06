
const Record = require('../models/Record');

exports.getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const incomeAgg = await Record.aggregate([
      { $match: { createdBy: userId, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const expenseAgg = await Record.aggregate([
      { $match: { createdBy: userId, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalIncome = incomeAgg[0]?.total || 0;
    const totalExpense = expenseAgg[0]?.total || 0;
    const netBalance = totalIncome - totalExpense;

    const categoryBreakdown = await Record.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: { category: '$category', type: '$type' },
          total: { $sum: '$amount' }
        }
      },
      {
        $project: {
          category: '$_id.category',
          type: '$_id.type',
          total: 1,
          _id: 0
        }
      }
    ]);

    const recentActivity = await Record.find({ createdBy: userId })
      .sort({ date: -1 })
      .limit(5);

    const trends = await Record.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $project: {
          year: '$_id.year',
          month: '$_id.month',
          total: 1,
          _id: 0
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryBreakdown,
      recentActivity,
      trends
    });
  } catch (error) {
    next(error);
  }
};