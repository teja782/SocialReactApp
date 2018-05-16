const express = require('express');
const mongoose = require('mongoose');
const users = require('./Backend/Routes/api/users')
const profiles = require('./Backend/Routes/api/profiles')
const posts = require('./Backend/Routes/api/posts')

const app = express();
const db = require('./config/config').mongoURI;

//MongoDB connection
mongoose.connect(db)
    .then(() => {
        console.log('connection successful');
    })
    .catch((err) => {
        console.log('connection is unsuccesful');
    })

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/users',users);

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});