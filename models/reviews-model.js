const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewsSchema = new Schema({
    courseDetailsRef: { type: Schema.Types.ObjectId, ref: 'CourseDetails'},
    userIdsRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: String,
    comment: String,
    date: Date,
    liked: Number,
    disliked: Number,

});
// replay it should be sub-document comment ref to user it should be the same as here.

reviewsSchema.set('toJSON', {
    virtuals: true
});
// TODO Count Virtual type
reviewsSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('Reviews', reviewsSchema);
