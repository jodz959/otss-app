module.exports = function(app) {
const controller = require('../controllers/controllers.js');
app.route('/register')
	.post(controller.register);

app.route('/login')
	.post(controller.login);

app.route('/getEvents')
	.get(controller.getEvents);

app.route('/setPreferences')
	.post(controller.setPreferences);
};
