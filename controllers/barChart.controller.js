const Transaction = require('../models/transaction');

const getBarChart = async (req, res) => {
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
        _id: {
          $cond: [
            { $lt: ['$price', 100] },
            '0-100',
            {
              $cond: [
                { $lt: ['$price', 200] },
                '101-200',
                {
                  $cond: [
                    { $lt: ['$price', 300] },
                    '201-300',
                    {
                      $cond: [
                        { $lt: ['$price', 400] },
                        '301-400',
                        {
                          $cond: [
                            { $lt: ['$price', 500] },
                            '401-500',
                            {
                              $cond: [
                                { $lt: ['$price', 600] },
                                '501-600',
                                {
                                  $cond: [
                                    { $lt: ['$price', 700] },
                                    '601-700',
                                    {
                                      $cond: [
                                        { $lt: ['$price', 800] },
                                        '701-800',
                                        {
                                          $cond: [
                                            { $lt: ['$price', 900] },
                                            '801-900',
                                            '901-above',
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(data);
};

module.exports = getBarChart;