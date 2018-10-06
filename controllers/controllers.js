const request = require('request');
const rp = require('request-promise');

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
	
}

const categories = ["Arts & Theatre", "Film", "Miscellaneous", "Music", "Sports", "Undefined", "Donation", "Event Style", "Group", "Individual", "Merchandise", "Nonticket", "Parking", "Transportation", "Upsell", "Venue Based"];

const genreId = {
	'R&B': 'KnvZfZ7vAee',
	'Hip-Hop/Rap': 'KnvZfZ7vAv1',
	'Comedy': 'KnvZfZ7vAe1',
	'Classical': 'KnvZfZ7v7nJ',
	'Jazz': 'KnvZfZ7vAvE',
	'Foreign': 'KnvZfZ7vAk1',
	'Dance/Electronic': 'KnvZfZ7vAvF',
	'Comedy': 'KnvZfZ7vAkA',
	'Animation': 'KnvZfZ7vAkd',
	'Music': 'KnvZfZ7vAkJ',
	'Miscellaneous': 'KnvZfZ7vAka',
	'Family': 'KnvZfZ7vAkF',
	'Miscellaneous Theatre': 'KnvZfZ7v7ld',
	'Theatre': 'KnvZfZ7v7l1'
}


module.exports.addUser = function(db, preference)
 {
	db.get('preferences')
		.push(preference)
		.value();
};


module.exports.getUser = function(db, uname, pword) {
	return db.get('preferences')
		.find({ user: uname, password: pword })
		.value();
};

const updatePreference = function(db, uname, category, genre) {

	db.get('preferences')
		.find({ user: uname })
		.assign({ category: category, genre: genre })
	.value();

}

module.exports.register = function(db) {

console.log(db.get('preferences')
		.size()
		.value());
 return function(req, res) {
        //store login state and display 
	//info as characters
        req.session.user = req.body.user;
        req.session.login = 'true';
	req.session.category = req.body.category;
	req.session.genre = req.body.genre;
        
	//add to databse
	module.exports.addUser(db, req.body);

	//print with password blocked
	const body = JSON.parse(JSON.stringify(req.body));
	body.password = '********';
        res.json(body);
};
};

module.exports.login = function(db) {
return function(req, res) {
//check if session user exists
//if session exists, write login true
        const login = {};
	console.log(req.body);
	const user = module.exports.getUser(db, req.body.user, req.body.password);
	console.log(user);

	const val = db.get('preferences')
			.find({ user: req.body.user })
			.value();
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
};


//test if user is logged in, 
//make middleware
module.exports.getEvents = function(req, res) {
		let query ='?classificationName='+req.session.category;
		query =query.concat('&genreId='+genreId[req.session.genre])	
		options.url = (options.url).concat(query);
		
		console.log(options.url);
	request(options, function(err, response, body) {
		console.log(response);
		if(err){
			res.send(err);
		} 
		
		console.log(body);
		res.json(body);	
	});

};

module.exports.setPreferences = function(db) {

	return function(req, res) {
		//check if genre,category is valid
		const error = {};
		console.log(req.body);
		const cat = req.body.category;
		const genre = req.body.genre;

		if (categories.includes(cat) && genreId[genre] !== undefined) {
			updatePreference(db, req.session.user, cat, genre);
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

};	
