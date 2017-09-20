const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    text: String,
    mood: String,
    date: {
        type: Date,
        default: Date.now
    },
    location: String,
});

const Submission = mongoose.model('Submision, submissionSchema');

module.exports = {
    Submission
};
