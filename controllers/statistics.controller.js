const Transaction = require('../models/transaction');

const getStatistics = async (req, res) => {
  const month = req.query.month;

  const query = {
    dateOfSale: {
      $gte: new Date(`January ${month}, 1970`),
      $lt: new Date(`January ${month + 1}, 1970`),
    },
  };

  const totalSaleAmount = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } },
  ]);

  const totalSoldItems = await Transaction.countDocuments({
    ...query,
    sold: true,
  });

  const totalNotSoldItems = await Transaction.countDocuments({
    ...query,
    sold: false,
  });

  res.json({
    totalSaleAmount: totalSaleAmount[0].totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  });
};

module.exports = getStatistics;