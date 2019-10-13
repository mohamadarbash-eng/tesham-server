const User = require('./../../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    postNewUser(req, res, next) {
        const {email, password} = req.body;
        bcrypt.hash(password, 10)
            .then(password => {
                const user = new User({
                    email,
                    password
                });
                user.save().then((account) => {
                    res.status(201).json({
                        message: 'new user account is created',
                        result: account
                    });
                    next();
                }).catch((error) => {
                    res.status(500).json([{
                        errorId: 'UNKNOWN_ERROR',
                        errorMessage: error
                    }]);
                    next();
                });
            }).catch((error) => {
            res.status(500).json([{
                errorId: 'UNKNOWN_ERROR',
                errorMessage: error
            }]);
            next();
        });
},
    postUserCredentials(req, res, next) {
        const {email, password} = req.body;
        let userID;
        User.findOne({email: email})
            .then(user => {
                if(!user) {
                   return res.status(401).json({
                       error:[{errorId: 'CUSTOMER_NOT_FOUND'}]
                    });

                }
                userID = user.id;
               return bcrypt.compare(password,user.password);

            }).catch((error) => {
            res.status(500).json([{
                errorId: 'UNKNOWN_ERROR',
                errorMessage: error
            }]);
            next();
        }).then((result) =>  {
            if(!result) {
                 return res.status(401).json({
                    error:[{errorId: 'PASSWORD_IS_WRONG'}]
                });
            }
            const token = jwt.sign({email, id: userID}, process.env.JWT_KEY , {
                expiresIn: '1h'
            });
            res.status(200).json({
                token,
                login: true,
                userID
            });
            next();
        }).catch((error) => {
            res.status(401).json({
                errorId: 'UNKNOWN_ERROR',
                errorMessage: error
            });
            next();
        });
    }
};

module.exports = userController;


