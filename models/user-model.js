const mongoose = require('mongoose');
 const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    address: {city: String, street: String, streetNr: String, country: String},
    phoneNumber: {type: String, required: true},
    nationality: String,
    fixedNumber: String,
    majorOfStudy: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    virtuals: true
});
// TODO Count Virtual type
userSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('User', userSchema);
