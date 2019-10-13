const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
// TODO middleware file
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        const error = isValid ? null : new Error(`Invalid mime type`);
        callback(error, 'assets/images');
    },
    filename: (req, file, callback) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        const name = file.originalname.toLowerCase().split(' ').join('-');
        callback(null,  name);
    }
});


module.exports = multer({storage:storage}).single('image');
