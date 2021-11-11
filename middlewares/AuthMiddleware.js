module.exports = async function AuthMiddleware(req, res, next) {
    if(req.user) {
        next()
    }else {
        res.redirect("/apexschool/login")
    }
}