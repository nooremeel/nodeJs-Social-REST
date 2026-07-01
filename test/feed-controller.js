const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user');

const feedController = require('../controllers/feed');

describe('Feed Controller', function () {

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

    it('should add a created post to the posts of the creator', async function () {
        this.timeout(5000);

        const req = {
            body: {
                title: 'test post',
                content: 'this is a test'
            },
            file: {
                path: 'test'
            },
            userId: '5c0f66b979af55031b34728a'
        };
        const res = {
            status: function () {
                return this;
            },
            json: function () { }
        };

        await feedController.createPost(req, res, () => { });

        const updatedUser = await User.findById('5c0f66b979af55031b34728a');
        expect(updatedUser).to.have.property('posts');
        expect(updatedUser.posts).to.have.length(1); 
    });

});