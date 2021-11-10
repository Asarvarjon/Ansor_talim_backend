module.exports = class ProfileController{
    static async ProfileGetController(req, res){
        try {
            console.log(req.user);
            res.render("profile", { 
            })
        } catch (error) {
            
        }
    }
}