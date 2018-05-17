import express from 'express';
import mongoose from 'mongoose';
import Users from './Backend/Routes/api/users';
import Profiles from './Backend/Routes/api/profiles';
import Posts from './Backend/Routes/api/posts';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

import { WSAELOOP } from 'constants';

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

// Middelewares
// Body Parser
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/users',Users);
app.use('/profiles',Profiles);
app.use('/posts',Posts);

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});