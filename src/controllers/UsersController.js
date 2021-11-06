const { comparePassword } = require("../modules/bcrypt");
const { AdminLoginValidation } = require("../modules/Validations");

module.exports = class  UsersController{
    static async AdminLoginPostController(req, res, next) {
        try {
            const { email, password } = await AdminLoginValidation(req.body, res.error);

            const admin = await req.db.users.findOne({
                raw: true,
                where: {
                    user_email: email
                }
            })

            if(!admin) {
                throw new Error("Emailingiz noto'g'ri")
            };

            if(!(await comparePassword(password, admin.user_password))){
                throw new Error("Parolingiz xato")
            }

            
            const session = await req.db.sessions.create({
                user_id: admin.user_id,
                user_agent: req.headers["user-agent"],
           })

 
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}