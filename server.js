require('dotenv').config()

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});