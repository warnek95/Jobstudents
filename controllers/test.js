module.exports = {
    log : function(req,res,next){
        console.log(req.session)
        console.log("I'm a controller");
        next()
    }
}

