const { comparePassword } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const { AdminLoginValidation } = require("../modules/Validations");

module.exports = class  UsersController{
    static async LoginGetController(req, res, next){
        try {
            res.render("login", {})
        } catch (error) { 
            console.log(error);
        }
    }
    static async AdminLoginPostController(req, res, next) {
        try {
            const { username, password } = await AdminLoginValidation(req.body);

            const admin = await req.db.users.findOne({
                raw: true,
                where: {
                    user_username: username
                }
            }); 

            if(!admin) {
                throw new Error("Emailingiz noto'g'ri")
            };

            if(!(await comparePassword(password, admin.user_password))){
                throw new Error("Parolingiz xato")
            }


             await req.db.sessions.destroy({
                where: {
                     session_user_agent: req.headers["user-agent"],
                     user_id: admin.user_id
                }
             })

            
            const session = await req.db.sessions.create({ 
                session_user_agent: req.headers["user-agent"],
                user_id: admin.user_id
            }); 

            const token = await createToken({
                session_id: session.dataValues.session_id
            });

            res.cookie("token", token).redirect("/admin_panel/")
        } catch (error) {  
            res.render("login", {
                error: error.message
            })
        }
    }

    static async UserSessionGetController(req, res, next){
        try {
            const sessions = await req.db.sessions.findAll({
                raw: true
            }); 
            res.render("sessions", {
                sessions
            });
        } catch (error) {
            console.log(error);
        }
    }


    static async SessionDeleteController(req, res, next) {
        try {
            const session_id = req.params.session_id;

            const session = await req.db.sessions.destroy({
                where: {
                    session_id: session_id
                }
            });

            res.redirect("/admin_panel/sessions")
        } catch (error) {
            console.log(error);
        }
    }
}