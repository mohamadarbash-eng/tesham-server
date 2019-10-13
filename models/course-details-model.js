const mongoose = require('mongoose');
const curriculumSchema = require('./sub-documents/curriculum-schema');
const Reviews = require('./reviews-model');
// TODO refactoring  review reference doc
// TODO : restructure reviews to use virtual populate
const Schema = mongoose.Schema;
const courseDetailsSchema = new Schema({
    medias: [{type: 'image' | 'video', title: String, alt: String, url: {type: String, default: null}}],
    courseDescription: String,
    curriculum:  String,
    reviews: [{type: Schema.Types.ObjectId, ref: Reviews}],
    breadCrumb: [{label: String, linkTo: 'courseDescription' | 'curriculum' | 'reviews'}]
});


courseDetailsSchema.set('toJSON', {
    virtuals: true
});

courseDetailsSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('CourseDetails', courseDetailsSchema);
