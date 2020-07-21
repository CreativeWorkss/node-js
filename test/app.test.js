const payload = require('../payload')
const index = require('../app')
const output = require('../output')

var chai = require('chai'),
	chaiHttp = require('chai-http');
var expect = require("chai").expect;
chai.use(chaiHttp);
var app = index.app;


describe("API test suit ", function () {
	it("Should pass due to valid input and ouput", function (done) {
		chai.request(app)
			.post('/')
			.send(payload)
			.end(function (err, res) {
                expect(res).to.have.status(200);
                console.log('result.........' , JSON.stringify(res.body));
				expect(res.body).to.deep.equal(output);
				done();
			});
	});
	it("Should fail due to wrong wrong url", function (done) {
		chai.request(app)
			.post('/postdata1')
			.send(payload)
			.end(function (err, res) {
				expect(res).to.have.status(404);
				done();
			});
	});

	it("Should fail due to wrong input", function (done) {
		chai.request(app)
			.post('/')
			.send({a:1})
			.end(function (err, res) {
				expect(res).to.have.status(200);
				done();
			});
	});

	it("Should  fail due to wrong referance data", function (done) {
		chai.request(app)
			.post('/')
			.send(payload)
			.end(function (err, res) {
				res.name = 'unsubscriber';
				expect(res).to.not.equal(output);
				done();
			});
	});


});