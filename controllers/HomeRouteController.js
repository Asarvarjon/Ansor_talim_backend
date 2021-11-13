
module.exports = class  UsersController{
    static async HomeGetController(req, res, next) {
        try { 

            const news = await req.db.news.findAll({
                raw: true
            }) 

            res.render("index", { 
                news
            })
            
        } catch (error) { 
            next(error)
        }
    } 
}