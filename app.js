const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mern-challenge', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api', require('./routes/routes'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
