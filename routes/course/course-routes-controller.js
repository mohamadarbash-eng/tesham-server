const Course = require('./../../models/course-model');
const CourseDetails = require('./../../models/course-details-model');
const Reveiws = require('./../../models/reviews-model');

const courseController = {

    postCourse(req, res, next) {
        const course = req.body;
        const courseDetails = req.body && req.body.courseDetails;
        const courseDetailsModel = new CourseDetails({...courseDetails});

        const courseModel = new Course({
            ...course,
        });
        courseModel.courseDetails = courseDetailsModel;
        // TODO use promise.all
        Promise.all([courseModel.save(), courseDetailsModel.save()]).then((data) => {
            res.status(201).json({
                error: null
            });
            next();
        }).catch((error) => {
            res.status(400).json({error});
            next();
        });
    },

    getCourses(req, res, next) {
        const {offset, limit} = req.query;
        const courseQuery = Course.find();
        if (offset > -1 && limit > 0) {
            courseQuery.skip(+offset).limit(+limit)
        }
        Promise.all([courseQuery, Course.estimatedDocumentCount()]).then((courses) => {
            res.status(200).json({
                courses: courses[0],
                totalCount: courses[1]
            });
            next();
        }).catch((error) => {
            res.status(400).json({error});
            next();
        });

    },

    getCoursesCount(req, res, next) {
        Course.estimatedDocumentCount().then((courseCount) => {
            res.status(200).json({
                courseCount
            });
            next();
        }).catch((error) => {
            res.status(400).json({error});
            next();
        });

    },

    getCourseByID(req, res, next) {
        const {id} = req.params;
        Course.findById(id).then((course) => {
            res.status(200).json(
                course
            );
            next();
        }).catch((error) => res.status(400).json({error}));
    },

    getCourseDetails(req, res, next) {
        const {courseName} = req.params;
        Course.findOne({courseName: courseName}).populate(
            {
                path: 'courseDetails',
                populate: {path: 'reviews'}
            }).then((course) => {
                if (course) {
                    res.status(200).json(
                        course
                    );
                    next();
                } else {
                    res.status(404).json({error: 404, message: 'BAD_GATEWAY'});
                    next();
                }
        }).catch((error) => res.status(400).json({error}));
    },

    deleteCourse(req, res, next) {
        const {id} = req.params;
        Course.findByIdAndDelete(id).then((result) => {
            res.status(200).json();
            next();
        })

    },

    updateCourse(req, res, next) {
        const {id} = req.params;
        const imageUrl = req.file ? `/assets/images/${req.file.filename}`
            : req.body.imageUrl;
        const courseDetails = req.body && req.body.courseDetails;
        const courseData = {
            imageUrl,
            imageAlt: req.body.imageAlt,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            category: req.body.category,
            price: req.body.price,
            rating: req.body.rating
        };
        Course.findByIdAndUpdate(id, courseData, {new: true}).then((course) => {
            CourseDetails.findByIdAndUpdate(course.courseDetails, courseDetails).then(() => {
                res.status(201).json({error: null});
                next();
            });
        }).catch((error) => res.status(400).json({error}));

    }
};

module.exports = courseController;
