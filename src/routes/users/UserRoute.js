const { AdminLoginPostController } = require("../../controllers/UsersController");


const UserRouter = require("express").Router();


UserRouter.post("/auth/login", AdminLoginPostController)


module.exports = UserRouter;