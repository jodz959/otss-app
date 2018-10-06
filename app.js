const express = require('express');
//const low = require('lowdb');
//const FileSync = require('lowdb/adapters/FileSync');
const bodyParser = require('body-parser');
const controller = require('./controllers/controllers.js');
const session = require('express-session');
const routes = require('./routes/routes.js');
//const adapter = new FileSync('db.json');
const db = require('./db/db.js');

const app = express();
//const db = low(adapter);

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

db.createDb();
db.addUser(newUser);
//controller adds a user
//controller.addUser(db, newUser);
routes(app);
const port = process.env.PORT || 3000;

app.listen(port);

console.log('listening on ' + port); 
