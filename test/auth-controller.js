const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user');
const authController = require('../controllers/auth');

describe('Auth Controller', function () {

    before(async function () {
        this.timeout(10000);
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.etoo1jt.mongodb.net/${process.env.MONGO_TEST_DATABASE}?appName=social`
        );
        // Clean up any leftover user from a previous failed run
        await User.deleteMany({});
        const user = new User({
            email: 'tom@gmail.com',
            password: '123ttYY#@',
            name: 'Tom',
            posts: [],
            _id: '5c0f66b979af55031b34728a'
        });
        await user.save();
    });

    after(async function () {
        await User.deleteMany({});
        await mongoose.disconnect();
    });

    it('should throw an error with code 500 if accessing the database fails', async function () {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'tester@test.com',
                password: 'some password'
            }
        };

        try {
            await authController.login(req, {}, (err) => {
                expect(err).to.be.an('error');
                expect(err).to.have.property('statusCode', 500);
            });
        } finally {
            User.findOne.restore();
        }
    });

    it('should send a response with valid user status for an existing user', async function () {
        this.timeout(5000);

        const req = { userId: '5c0f66b979af55031b34728a' };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };

        await authController.getUserStatus(req, res, () => {});

        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal('I am new!');
    });

});