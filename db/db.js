const crypto = require('crypto');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

/*
hash funtion to hash password
*/
const hash = function(password) {
	return crypto.createHash('sha1').update(password).digest('base64');
};

/* 
makes the schema for the db
*/
module.exports.createDb = function() {
	db.defaults({ preferences: [] })
        .value();
};

/* 
adds a user to the databse
*/
module.exports.addUser = function(preference)
 {
	//hash password and replace plain text
	const password = preference.password;
	preference.password = hash(password);

        db.get('preferences')
                .push(preference)
                .value();
};

/*
gets a user from the database
*/
module.exports.getUser = function(uname, pword) {

	const password = hash(pword);

        return db.get('preferences')
                .find({ user: uname, password: password })
                .value();
};

/* update user preferences */
module.exports.updatePreference = function(uname, category, genre) {

        db.get('preferences')
                .find({ user: uname })
                .assign({ category: category, genre: genre })
        .value();

};


