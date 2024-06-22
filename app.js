const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Connect to MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Define a schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Define a model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await newUser.save();
        res.send('User registered successfully');
    } catch (err) {
        res.send('Error saving user');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
