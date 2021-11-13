const { StudentPostController, ContactPostController } = require("../../controllers/ContactController");
const { HomeGetController } = require("../../controllers/HomeRouteController");
const { SignOutController } = require("../../controllers/UsersController");


const HomeRoute = require("express").Router();

HomeRoute.get("/", HomeGetController)
HomeRoute.post("/course", StudentPostController)
HomeRoute.post("/contact", ContactPostController)
HomeRoute.get("/sign_out", SignOutController)



module.exports = HomeRoute;