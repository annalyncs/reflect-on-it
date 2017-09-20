const mongoose = require('mongoose');

const reflectionSchema = mongoose.Schema({
    text: String,
    mood: String,
    date: String,
    location: String,
});

const Reflection = mongoose.model('Reflection', reflectionSchema);

module.exports = {
    Reflection
};
