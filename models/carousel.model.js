const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CarouselSchema = Schema({
    medias: [{ type: 'image' | 'video', title: String, alt: String, url: { type: String, default: null } }],
    pageRoute: { type: String, required: true }
});


CarouselSchema.set('toJSON', {
    virtuals: true
});

CarouselSchema.methods.toJSON = function () {
    const course = this;
    let courseObject = course.toObject();
    courseObject.id = courseObject._id;
    delete courseObject._id;
    delete courseObject.__t;
    delete courseObject.__v;
    return courseObject;
};


module.exports = mongoose.model('Carousel', CarouselSchema);
