const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;
const dbName = process.env.DB_NAME;
const appRoutes = require("./routes");

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

//check the routes folder
app.use(appRoutes)







// Define routes
app.get('/', (req, res) => {

    res.send('Hello World!');

});






app.listen(PORT, () => {

    console.log(`Server listening on port "http://localhost:${PORT}"`);

});