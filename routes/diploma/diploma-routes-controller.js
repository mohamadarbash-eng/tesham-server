const Diploma = require('./../../models/diploma-model');
const DiplomaDetails = require('./../../models/diploma-details-model');
/**
 * DiplomaController Object, it contains Diploma Model's CRUDs
 * @type {{postDiploma(*, *, *): void, getDiplomas(*, *, *): void, deleteDiploma(*, *, *): void, updateDiploma(*, *, *): void, getDiplomaByID(*, *, *): void}}
 */
const diplomaController = {
    postDiploma(req, res, next) {
        const diploma = req.body;
        const diplomaDetails = req.body && req.body.diplomaDetails;
        console.log(diplomaDetails);
        const diplomaDetailsModel = new DiplomaDetails({...diplomaDetails});
        const diplomaModel = new Diploma({...diploma});

        diplomaModel.diplomaDetails = diplomaDetailsModel;
       // TODO use promise.all
       Promise.all([diplomaModel.save(), diplomaDetailsModel.save()]).then((data) => {
                res.status(201).json({
                    error: null
                });
                next();
        }).catch((error) => {
            res.status(400).json({error});
            next();
        });
    },
    getDiplomas(req, res, next) {
        const {offset, limit} = req.query;
        const diplomaQuery = Diploma.find();
        if (offset > -1 && limit > 0) {
            diplomaQuery.skip(+offset).limit(+limit)
        }
        Promise.all([diplomaQuery, Diploma.estimatedDocumentCount()]).then((diplomas) => {
            res.status(200).json({
                diplomas: diplomas[0],
                totalCount: diplomas[1]
            });
            next();
        }).catch((error) => {
            res.status(400).json({error});
            next();
        });

    },
     getDiplomasCount(req, res, next) {
         Diploma.estimatedDocumentCount().then((diplomaCount) => {
             res.status(200).json({
                 diplomaCount
             });
             next();
         }).catch((error) => {
             res.status(400).json({error});
             next();
         });

    },
    getDiplomaByID(req, res, next) {
        const {id} = req.params;
        Diploma.findById(id).then((diploma) => {
            res.status(200).json(
                diploma
            );
            next();
        }).catch((error) => res.status(400).json({error}));
    },
    getDiplomaDetails(req, res, next) {
        const {diplomaName} = req.params;
        console.log(diplomaName);
        Diploma.findOne({diplomaName: diplomaName}).populate('diplomaDetails').then((diploma) => {
            console.log(diploma);
            res.status(200).json(
                diploma
            );
            next();
        }).catch((error) => res.status(400).json({error}));
    },
    deleteDiploma(req, res, next) {
        const {id} = req.params;
        Diploma.findByIdAndDelete(id).then((result) => {
            console.log(result);
            res.status(200).json();
            next();
        })

    },
    updateDiploma(req, res, next) {
        const {id} = req.params;
        const imageUrl = req.file ? `/assets/images/${req.file.filename}`
            : req.body.imageUrl;
        const diplomaData = {
            imageUrl,
            imageAlt: req.body.imageAlt,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            category: req.body.category,
            price: req.body.price,
            rating: req.body.rating
        };
        Diploma.findByIdAndUpdate(id, diplomaData, {new: false}).then(() => {
            res.status(200).json({error: null});
            next();
        }).catch((error) => res.status(400).json({error}));

    }
};

module.exports = diplomaController;
