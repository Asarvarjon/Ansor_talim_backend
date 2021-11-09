const { comparePassword } = require("../modules/bcrypt");
const { AdminLoginValidation } = require("../modules/Validations");

module.exports = class  UsersController{
    static async AdminLoginPostController(req, res, next) {
        try {
            const { username, password } = await AdminLoginValidation(req.body, res.error);

            const admin = await req.db.users.findOne({
                raw: true,
                where: {
                    user_username: username
                }
            })

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
           } 
           ) 
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}