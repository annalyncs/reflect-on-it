const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();


const {
    Reflection
} = require('../models');
const {
    app,
    runServer,
    closeServer
} = require('../server');
const {
    TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);


function seedReflectionData() {
    console.info('seeding reflection data');
    const seedData = [];

    for (let i = 1; i <= 10; i++) {
        seedData.push(generateReflectionData());
    }
    // this will return a promise
    return Reflection.insertMany(seedData);
}

function generateReflectionData() {
    return {
        date: faker.date(),
        location: faker.address(),
        mood: faker.Lorem.words(),
        text: faker.Lorem.paragraph()
    }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Reflections API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedReflectionData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    })
});

describe('index page', function () {
    it('exists', function (done) {
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});


describe('GET endpoint', function () {
    it('should retrieve all reflections', function () {
        let res;
        return chai.request(app)
            .get('/reflections')
            .then(function (_res) {
                res = _res;
                res.should.have.status(200);
                res.body.reflections.should.have.length.of.at.least(1);
                return Reflection.count();
            })
            .then(function (count) {
                res.body.reflections.should.have.length.of(count);
            });
    });

});
