const mongoose = require('mongoose');
// TODO refactoring
const curriculumSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    content: [{title: String, subTitle: String, description: String, subCurriculum: []}],

});


module.exports = curriculumSchema;
