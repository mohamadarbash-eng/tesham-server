const mongoose = require('mongoose');
const schema = mongoose.Schema;


const assetsSchema = new schema({
    type: 'image' | 'video',
    name: {type: String, required: true},
});

assetsSchema.set('toJSON', {
    virtuals: true
});
// TODO Count Virtual type
assetsSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('Assets', assetsSchema);
