const { comparePassword } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const { AdminLoginValidation } = require("../modules/Validations");

module.exports = class  UsersController{
    static async LoginGetController(req, res, next){
        try {
            res.render("Login", {})
        } catch (error) {
            next(error)
        }
    }
    static async AdminLoginPostController(req, res, next) {
        try {
            const { username, password } = await AdminLoginValidation(req.body, res.error);

            const admin = await req.db.users.findOne({
                raw: true,
                where: {
                    user_username: username
                }
            });

            console.log(admin);

            // if(!admin) {
            //     throw new Error("Emailingiz noto'g'ri")
            // };

            // if(!(await comparePassword(password, admin.user_password))){
            //     throw new Error("Parolingiz xato")
            // }


            //  await req.db.sessions.destroy({
            //     where: {
            //          session_user_agent: req.headers["user-agent"],
            //          user_id: admin.user_id
            //     }
            //  })

            
            // const session = await req.db.sessions.create({ 
            //     session_user_agent: req.headers["user-agent"],
            //     user_id: admin.user_id
            // });

            // const token = await createToken({
            //     session_id: session_id
            // });

            // res.cookie("token", token).redirect("/admin")
        } catch (error) {
            res.render("Login", {
                error
            })
        }
    }
}