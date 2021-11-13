const { StudentPostController, ContactPostController } = require("../../controllers/ContactController");
const { HomeGetController } = require("../../controllers/HomeRouteController");


const HomeRoute = require("express").Router();

HomeRoute.get("/", HomeGetController)
HomeRoute.post("/course", StudentPostController)
HomeRoute.post("/contact", ContactPostController)



module.exports = HomeRoute;