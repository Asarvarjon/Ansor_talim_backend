const { UpdateAdressPostValidation } = require("../modules/Validations");

 
 
module.exports = class AdressController{
    static async AdressGetController(req, res, next) {
        try {

            const adress = await req.db.courses.findOne()
            console.log(adress);

            res.render("adress",{
                adress
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateAdressPostController(req, res, next){
        try { 
            const {  a_location, a_email, a_phone, a_facebook_link, a_telegram_link, a_youtube_link} = await UpdateAdressPostValidation(req.body);

            await req.db.adress.destroy();

            const adress = await req.db.adress.create({
                a_map: req.body.a_map,
                a_location,
                a_email,
                a_phone,
                a_facebook_link,
                a_telegram_link,
                a_youtube_link
            });

            console.log(adress);
             

            res.redirect("/admin_panel/address") 
        } catch (error) {
            console.log(error);
            res.render("adress",{
                error: error.message
            })
        }
    } 
}