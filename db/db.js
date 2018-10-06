const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports.createDb = function() {
	db.defaults({ preferences: [] })
        .value();
};
module.exports.addUser = function(preference)
 {
        db.get('preferences')
                .push(preference)
                .value();
};


module.exports.getUser = function(uname, pword) {
        return db.get('preferences')
                .find({ user: uname, password: pword })
                .value();
};

module.exports.updatePreference = function(uname, category, genre) {

        db.get('preferences')
                .find({ user: uname })
                .assign({ category: category, genre: genre })
        .value();

};


