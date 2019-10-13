const mongoose = require('mongoose');
const DiplomaDetails = require('./diploma-details-model');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;
const diplomaSchema = Schema({
    diplomaName: { type: String, required: true, unique: true },
    imageAlt: String,
    imageUrl: { type: String, default: null },
    imageTitle: { type: String, default: null },
    title: String,
    shortDescription: String,
    diplomaDetails: { type: Schema.Types.ObjectId, ref: DiplomaDetails },
    category: String,
    price: Number,
    rating: String
},{timestamps: true});


diplomaSchema.set('toJSON', {
    virtuals: true
});
// TODO Count Virtual type
diplomaSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};

diplomaSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Diploma', diplomaSchema);
