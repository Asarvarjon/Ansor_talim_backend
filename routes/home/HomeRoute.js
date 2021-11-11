const { HomeGetController } = require("../../controllers/HomeRouteController");


const HomeRoute = require("express").Router();

HomeRoute.get("/", HomeGetController)



module.exports = HomeRoute;