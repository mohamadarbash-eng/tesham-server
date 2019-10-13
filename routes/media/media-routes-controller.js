const fs = require('fs');
const path = require('path');
const Assets = require('./../../models/assets-model');

/**
 * CourseController Object, it contains Course Model's CRUDs
 * @type {{postCourse(*, *, *): void, getCourses(*, *, *): void, deleteCourse(*, *, *): void, updateCourse(*, *, *): void, getCourseByID(*, *, *): void}}
 */
const mediaController = {
    getImagesLink(req, res, next) {
        Assets.find().then((imagesLink) => {
            res.status(200).json({
                imagesLink
            });
        }).catch((error) => {
            res.status(500).json({
                error
            });
        }).finally(() => {
            next();
        });
    },
    postImage(req, res, next) {
        if (req.file) {
            const assets = new Assets({
                type: 'image',
                name: req.file.filename
            });
            assets.save().then(() => {
                res.status(201).json({
                    imageName: req.file.filename
                });
            }).catch((e) => {
                res.status(400).json({
                    error: e
                });
            }).finally(() => {
                next();
            });
        } else {
            res.status(400).json({
                error: 'FILE_NOT_FOUND'
            });
            next();
        }
    },
    deleteImage(req, res, next) {
        const {filePath} = req.params;

        if (filePath) {
            const deletePath = 'assets/images/' + filePath;
            fs.unlink(deletePath, (err) => {
                if (!err) {
                    Assets.deleteMany({name: filePath}).then((resp) => {
                        if (resp.deletedCount > 0) {
                            res.status(201).json({
                                success: `${filePath} is deleted`
                            });
                        } else {
                            res.status(400).json({
                                error: e
                            });
                        }
                    }).catch((e) => {
                        res.status(400).json({
                            error: e
                        });
                    }).finally(() => {
                        next();
                    });
                } else {
                    res.status(400).json({
                        error: err
                    });
                    next();
                }
            })

        } else {
            res.status(400).json({
                error: 'NO_FILE_TO_DELETE'
            });
            next();
        }
    },


};

module.exports = mediaController;
