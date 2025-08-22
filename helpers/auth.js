module.exports.checkAuth = function(req,res,next) {
    const hasSession = req.session.userId
    if(!hasSession) {
        return res.redirect('/login')
    }
    next();
}