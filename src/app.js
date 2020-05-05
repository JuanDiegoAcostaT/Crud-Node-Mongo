const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose')
const routes = require('./routes/index');


const app = express();



// Db

mongoose.connect('mongodb://localhost/crud-mongo')
.then(db => console.log('Db Connected'))
.catch(err => console.log(err))


//Settings

app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.set('AppName', 'JdaExpress')


//Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());


//Routes

app.use(routes);

//Static Files

app.use(express.static(path.join(__dirname, '/public')))


//Starting Server

app.listen(app.get('PORT'), () => {
    console.log(app.get('AppName'))
    console.log('Server on port ', `${app.get('PORT')}`);
})

