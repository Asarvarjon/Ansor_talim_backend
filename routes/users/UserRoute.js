const { LoginGetController, AdminLoginPostController } = require("../../controllers/UsersController");


const UserRouter = require("express").Router();


UserRouter.get("/ansor_login", LoginGetController );
UserRouter.post("/ansor_login", AdminLoginPostController );



module.exports = UserRouter;