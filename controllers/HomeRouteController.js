
module.exports = class  UsersController{
    static async HomeGetController(req, res, next) {
        try { 
            res.render("index", { })
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}