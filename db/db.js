const crypto = require('crypto');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const hash = function(password) {
	return crypto.createHash('sha1').update(password).digest('base64');
}

module.exports.createDb = function() {
	db.defaults({ preferences: [] })
        .value();
};
module.exports.addUser = function(preference)
 {
	const password = preference.password;
	preference.password = hash(password);
	console.log(preference.password);
        db.get('preferences')
                .push(preference)
                .value();
};


module.exports.getUser = function(uname, pword) {

	const password = hash(pword);
        return db.get('preferences')
                .find({ user: uname, password: password })
                .value();
};

module.exports.updatePreference = function(uname, category, genre) {

        db.get('preferences')
                .find({ user: uname })
                .assign({ category: category, genre: genre })
        .value();

};


