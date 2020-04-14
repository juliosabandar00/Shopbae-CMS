function errorHandler (err, req, res, next) {
    if(err){
        if(err.message == 'Incorrect Email/Password'){
            res.status(400).json({message : 'Incorrect Email/Password'});
        }
        else if(err.name == 'SequelizeValidationError'){
            res.status(400).json({message : 'Invalid Input'});
        }
        else if(err.message == 'Product Not Found'){
            res.status(404).json({message : 'Product Not Found'});
        }
        else{
            res.status(500).json({message : 'Internal Server Error'});
        }
    }
}
module.exports = errorHandler;