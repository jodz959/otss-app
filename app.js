const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/controllers.js');
const session = require('express-session');
const routes = require('./routes/routes.js');
const db = require('./db/db.js');

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: 'ghost',
	resave: true,
	saveUninitialized: true	 
}));

//TODO: add as test cases
const newUser = {
	user: 'doe',
	password: '12345',
	category: 'film',
	genre: 'comedy'
};

//create db
db.createDb();
db.addUser(newUser);

//get routes 
routes(app);
const port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
console.log('Listening on ' + port); 
