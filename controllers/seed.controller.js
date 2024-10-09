const axios = require('axios');
const Transaction = require('../models/transaction');

const seedDatabase = async () => {
  const response = await axios.get('(link unavailable)');
  const data = response.data;

  await Transaction.deleteMany({});

  data.forEach((transaction) => {
    const newTransaction = new Transaction(transaction);
    newTransaction.save();
  });

  console.log('Database seeded successfully');
};

module.exports = { seedDatabase };
