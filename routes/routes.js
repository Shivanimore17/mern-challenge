const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const statisticsController = require('../controllers/statistics.controller');
const barChartController = require('../controllers/barChart.controller');
const pieChartController = require('../controllers/pieChart.controller');

// Transaction Routes
router.get('/transactions', transactionController.getTransactions);
router.get('/transactions/statistics', statisticsController.getStatistics);
router.get('/transactions/bar-chart', barChartController.getBarChart);
router.get('/transactions/pie-chart', pieChartController.getPieChart);

// Seed Database Route
router.get('/seed', async (req, res) => {
  await require('../controllers/seed.controller').seedDatabase();
  res.send('Database seeded successfully');
});

module.exports = router;