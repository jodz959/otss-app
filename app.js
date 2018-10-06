const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bodyParser = require('body-parser');
const controller = require('./controllers/controllers.js');
const session = require('express-session');
const routes = require('./routes/routes.js');
const adapter = new FileSync('db.json');


const app = express();
const db = low(adapter);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: 'ghost',
	resave: true,
	saveUninitialized: true	 
}));


db.defaults({ preferences: [] })
	.value();

db.get('preferences')
	.push({
		user: 'jane',
		category: 'Music',
		genre: 'Classical'
	 })
	.value();

const newUser = {
	user: 'doe',
	password: '12345',
	category: 'film',
	genre: 'comedy'
}

//controller adds a user
controller.addUser(db, newUser);
routes(app, db);
const port = process.env.PORT || 3000;
/*
app.get('/register', function(req, res) {
	const val = db.get('preferences')
			.find({ user: 'doe' })
			.value();
	val.pw = '*********';
	res.json(val);
});

app.post('/register', function(req, res) {
	console.log(req.body);
	req.session.user = req.body.user;
	req.session.login = true;
	console.log(req.session.user);
	res.json(req.body);
});

app.post('/login', function(req, res) {
//check if session user exists
//if session exists, write login true
	const login = {};
	if (req.session.login) {
		login.login = 'true';
		res.json(login);
	} else {
		const user = controller.getUser(db, req.body.user, req.body.password);
		if (user !== undefined) {
			login.login = 'true';
			req.session.login = true;
			res.json(login);
		} else {
			login.login = 'false';
			login.error = 'User does not exist';
			res.json(login);
		}


	}

//if session does not exist,
//check if user is in db
//if user is in db, them login is true
//if user is not in db, then log in is false, redirect user


}); */

app.listen(port);

console.log('listing on ' + port); 
