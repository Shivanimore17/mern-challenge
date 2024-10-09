const Transaction = require('../models/transaction');

const getTransactions = async (req, res) => {
  const month = req.query.month;
  const search = req.query.search;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const query = {
    dateOfSale: {
      $gte: new Date(`January ${month}, 1970`),
      $lt: new Date(`January ${month + 1}, 1970`),
    },
  };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: { $regex: search, $options: 'i' } },
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(transactions);
};

module.exports = getTransactions;

