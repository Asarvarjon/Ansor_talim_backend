const { ContactPostController } = require("../../controllers/ContactController");
const { HomeGetController } = require("../../controllers/HomeRouteController");


const HomeRoute = require("express").Router();

HomeRoute.get("/", HomeGetController)
HomeRoute.post("/contact", ContactPostController)



module.exports = HomeRoute;