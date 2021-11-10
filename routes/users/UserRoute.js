const { LoginGetController, AdminLoginPostController } = require("../../controllers/UsersController");


const UserRouter = require("express").Router();


UserRouter.get("/login", LoginGetController );
UserRouter.post("/login", AdminLoginPostController );



module.exports = UserRouter;