require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Task Magic API is running! 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎉 Server started on port ${PORT}`));











