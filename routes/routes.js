module.exports = function(app, db) {
const controller = require('../controllers/controllers.js');
app.route('/register')
	.get(function(req, res) {
        const val = db.get('preferences')
                        .find({ user: 'doe' })
                        .value();
        val.pw = '*********';
        res.json(val);
})
	.post(controller.register(db));

app.route('/login')
	.post(controller.login(db));

app.route('/getEvents')
	.get(controller.getEvents);

app.route('/setPreferences')
	.post(controller.setPreferences(db));
};
