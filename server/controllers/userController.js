const { User } = require('../models');
const checkPassword = require('../helpers/checkPassword');
const hashPassword = require('../helpers/hashPassword');
const jwt = require('jsonwebtoken');
class UserController {
    static login(req, res, next){
        console.log(req.body)
        let input = req.body;
        User.findOne({where : {email : input.email}})
		.then( user => {
			if(user){
				if(checkPassword(input.password, user.password, next)){
					const access_token = jwt.sign({
                        userId : user.id,
                        email : user.email,
                        username : user.username,
                        role: user.role
					}, process.env.JWT_SECRETKEY);
					res.status(200).json({access_token});
				}else{
                    throw new Error('Incorrect Email/Password');
				}
			}else{
				throw new Error('Incorrect Email/Password');
			}
		})
        .catch(next);
    }
    static register(req, res, next){
        User.create({
            email : req.body.email,
            username: req.body.username,
            password : hashPassword(req.body.password, next)
        })
        .then( user => {
            res.status(201).json({user});
        })
        .catch(next);
    }

}
module.exports = UserController;
