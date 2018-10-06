module.exports = function(app) {
const controller = require('../controllers/controllers.js');
const auth = require('../middlewares/auth.js');

app.route('/register')
	.post(controller.register);

app.route('/login')
	.post(controller.login);

app.use(auth);
app.route('/getEvents')
	.get(controller.getEvents);

app.route('/setPreferences')
	.post(controller.setPreferences);
};
