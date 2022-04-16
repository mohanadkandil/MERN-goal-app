const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

// Initliaze Express

const app = express();

// Link get goals api gateway with thr route
app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));

