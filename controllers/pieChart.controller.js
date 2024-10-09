const Transaction = require('../models/transaction');

const getPieChart = async (req, res) => {
  const month = req.query.month;

  const query = {
    dateOfSale: {
      $gte: new Date(`January ${month}, 1970`),
      $lt: new Date(`January ${month + 1}, 1970`),
    },
  };

  const data = await Transaction.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(data);
};

module.exports = getPieChart;
