const { UpdateAdressPostValidation } = require("../modules/Validations");

 
 
module.exports = class AdressController{
    static async AdressGetController(req, res, next) {
        try { 
            const address = await req.db.address.findAll({
                raw: true
            })
            console.log(address);

            res.render("adress",{
                address
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateAdressPostController(req, res, next){
        try {  
            const {a_map, a_location, a_email, a_phone, a_facebook_link, a_telegram_link, a_youtube_link} = await UpdateAdressPostValidation(req.body);

            const a = await req.db.address.findOne({
                raw: true
            })

            const address = await req.db.address.update({
                a_map,
                a_location,
                a_email,
                a_phone,
                a_facebook_link,
                a_telegram_link,
                a_youtube_link
            }, {
                where: {
                    a_id: a.a_id
                }
            });
 
             

            res.redirect("/admin_panel/address") 
        } catch (error) {
            console.log(error);
            res.render("adress",{
                error: error.message
            })
        }
    } 
}