function authorization (req, res, next){
    if(req.Role === 'Admin'){
        next();
    }else{
        res.status(403).json({message: 'Access Forbidden'})
    }}
module.exports = authorization;