const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Express Routes
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.json({ success: true, message: 'User signed up successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error signing up user' });
    }
});

// Add login route and other routes as needed

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
