const mongoose = require('mongoose');
const CourseDetails = require('./course-details-model');
const Schema = mongoose.Schema;
const courseSchema = Schema({
    imageAlt: String,
    imageUrl: { type: String, default: null },
    imageTitle: { type: String, default: null },
    courseName: String,
    title: String,
    shortDescription: String,
    courseDetails: { type: Schema.Types.ObjectId, ref: CourseDetails },
    category: String,
    price: Number,
    rating: String
});


courseSchema.set('toJSON', {
    virtuals: true
});
// TODO Count Virtual type
courseSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('Course', courseSchema);
