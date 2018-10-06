const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();

chai.use(chaiHttp);


describe('Post Request', function() {

	describe('/register POST', function() {
	it('should register a user ', function(done) {
		chai.request(server)
			.post('/register')
			.send({ 
				"user" : "Tester one",
				"password": "myAwesomePassword",
				"category": "Music",
				"genre": "R&B"
			})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.property('user');

				res.body.should.have.property('password');
				res.body.should.have.property('category');
				res.body.should.have.property('genre');
				done();
			});

	});
});

	describe('/login POST', function() {
	it('should log in a user /login post', function(done) {
		chai.request(server)
			.post('/login')
			.send({ 
				"user": "Tester one",
				"password": "myAwesomePassword"
			})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.property('login');
				done();
			});

	});
});

	/* TODO: make test work for sessions
	  Will always produce error since
  	  sessions are not stored */
	describe('/setPreferences POST', function() {
	it('should set preference /setPreference POST', function(done) {
		chai.request(server)
			.post('/setPreference')
			.send({
				"category": "Music",
				"genre": "Classical"

			})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.should.have.property('error');
			done();
			});
	
	});
});

});
