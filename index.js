const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbName = process.env.DB_NAME;
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




// Define routes
app.get('/', (req, res) => {

    res.send('Hello World!');

});






app.listen(PORT, () => {

    console.log(`Server listening on port "http://localhost:${PORT}"`);

});