module.exports = function(req, res, next) {
	if (req.session.login){
		console.log('here');
		next();
	} else {
		console.log('here instead');
		res.json({ error: 'User not found' }).end();
	}

};
