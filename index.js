const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;
const dbName = process.env.DB_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

// import models
// const { Reaction, Thought, User } = require('/models');

// connect to MOngoDB
mongoose.connect(`mongodb://localhost/${dbName}`, { 
    
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;


db.on('error', (err) => {

    console.error(err);

});


db.once('open', () => {

    console.log('Database connected');

});



// import routes
// const thoughtRoutes = require('./routes/api/thoughtRoutes');
const userRoutes = require('./routes/api/userRoutes');
const reactionRoutes = require('./routes/api/reactionRoutes');






// use routes
// app.use('/api/', thoughtRoutes);
app.use('/api/', userRoutes);
app.use('/api/', reactionRoutes);







// Define routes
app.get('/', (req, res) => {

    res.send('Hello World!');

});






app.listen(PORT, () => {

    console.log(`Server listening on port "http://localhost:${PORT}"`);

});