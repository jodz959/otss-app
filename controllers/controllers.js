const request = require('request');
const db = require('../db/db.js');

const config = require('../config/config.js');
const options = {
	url: 'https://yv1x0ke9cl.execute-api.us-east-1.amazonaws.com/prod/events',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Accept-Charset': 'utf-8'
	},
	auth: {
		'user': config.user,
		'password': config.password,
		
	},
	json: true
	
};

const categories = ["Arts & Theatre", "Film", "Miscellaneous", "Music", "Sports", "Undefined", "Donation", "Event Style", "Group", "Individual", "Merchandise", "Nonticket", "Parking", "Transportation", "Upsell", "Venue Based"];

const genreId = {
	'R&B': 'KnvZfZ7vAee',
	'Hip-Hop/Rap': 'KnvZfZ7vAv1',
	'Comedy': 'KnvZfZ7vAe1',
	'Classical': 'KnvZfZ7v7nJ',
	'Jazz': 'KnvZfZ7vAvE',
	'Foreign': 'KnvZfZ7vAk1',
	'Dance/Electronic': 'KnvZfZ7vAvF',
	'Animation': 'KnvZfZ7vAkd',
	'Music': 'KnvZfZ7vAkJ',
	'Miscellaneous': 'KnvZfZ7vAka',
	'Family': 'KnvZfZ7vAkF',
	'Miscellaneous Theatre': 'KnvZfZ7v7ld',
	'Theatre': 'KnvZfZ7v7l1'
};

/*
checks if category and genre exists
*/
const isValid = function(category, genre) {
	if (categories.includes(category) && genreId[genre] !== undefined) {
		return true;
	} else {
		return false;
	}

};

/*
registers a user and their preferences
*/
module.exports.register = function(req, res) {
        //store login state and display 
	//info as characters
        req.session.user = req.body.user;
        req.session.login = 'true';
	
	const cat = req.body.category;
	const genre = req.body.genre;
	if (isValid(cat, genre)) {
		req.session.category = cat;
		req.session.genre = genre;
		//add to databse
		db.addUser(req.body);

		//print with password blocked
		const body = JSON.parse(JSON.stringify(req.body));
		body.password = '********';
        	res.json(body);
	} else {
		res.json({ error: 'Invalid category or genre' });
	}
};

/*
logs in a user that is already registered
*/
module.exports.login = function(req, res) {
//check if session user exists
//if session exists, write login true
        const login = {};
	console.log(req.body);
	const user = db.getUser(req.body.user, req.body.password);
	console.log(user);

        if (req.session.login && user !== undefined) {
                login.login = 'true';
                res.json(login);
        } else {
                if (user !== undefined) {
                        login.login = 'true';
                        req.session.login = true;
			req.session.category = user.category;
			req.session.genre = user.genre;
                        res.json(login);
                } else {
			req.session.login = false;
                        login.login = 'false';
			login.error = 'User not found';
			res.json(login);
		}
	}
};


 
/*
gets events according to preferences
from /events
*/
module.exports.getEvents = function(req, res) {
	let query ='?classificationName='+req.session.category;
	query =query.concat('&genreId='+genreId[req.session.genre]);	
	options.url = (options.url).concat(query);
		
	//make a request to external api to get events
	request(options, function(err, response, body) {
		console.log(response);
	
		if(err){
			res.send(err);
		} else {		
			console.log(body);
			res.json(body);	
		}
	});

};

/*
sets user preferences
*/
module.exports.setPreferences = function(req, res) {
	//check if genre,category is valid
	const error = {};
	console.log(req.body);
	const cat = req.body.category;
	const genre = req.body.genre;

	if (isValid(cat, genre)) {
		db.updatePreference(req.session.user, cat, genre);
		req.session.genre = genre;
		req.session.category = cat;	
		console.log(req.session.genre);
		error.success = 'Preference updated';
			res.json(error);
	} else {
		error.error = 'Not valid categories and genre';
		res.json(error);
	}		

};
	
