const mongoose = require('mongoose');
const curriculumSchema = require('./sub-documents/curriculum-schema');
// TODO refactoring  review reference doc
// TODO : restructure reviews to use virtual populate
const Schema = mongoose.Schema;
const diplomaDetailsSchema = Schema({
    medias: [{type: 'image' | 'video', title: String, alt: String, url: {type: String, default: null}}],
    diplomaDescription: String,
    curriculum: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'Reviews'}],
    breadCrumb: [{label: String, linkTo: 'diplomaDescription' | 'curriculum' | 'reviews'}]
});
 /*
    diplomaDescription: {title: String, content: String},
    curriculum: {title: String, content: curriculumSchema},
  */

diplomaDetailsSchema.set('toJSON', {
    virtuals: true
});

diplomaDetailsSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('DiplomaDetails', diplomaDetailsSchema);
