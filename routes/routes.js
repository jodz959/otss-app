module.exports = function(app, db) {
const controller = require('../controllers/controllers.js');
app.route('/register')
	.post(controller.register(db));

app.route('/login')
	.post(controller.login(db));

app.route('/getEvents')
	.get(controller.getEvents);

app.route('/setPreferences')
	.post(controller.setPreferences(db));
};
