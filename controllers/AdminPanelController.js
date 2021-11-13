const { AssetsValidation } = require("../modules/Validations");

module.exports = class ProfileController{
    static async PanelGetController(req, res){
        try { 
            res.render("adminpanel", { 
            })
        } catch (error) {
            console.log(error);
        }
    }


    static async UpdateAdressPostController(req, res, next){
        try {  
            const {main_motto, main_title} = await AssetsValidation(req.body);

            const info = await req.db.assets.findOne({
                raw: true
            })

            const main_info = await req.db.assets.update({
                main_motto,
                main_title
            }, {
                where: {
                    main_id: info.main_id
                }
            });
 
            
            res.redirect("/admin_panel/") 
        } catch (error) {
            console.log(error);
            res.render("adress",{
                error: error.message
            })
        }
    } 
}