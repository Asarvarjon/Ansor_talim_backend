const { HomeGetController } = require("../../controllers/HomeRouteController");


const HomeRoute = require("express").Router();

HomeRoute.get("/", HomeGetController)

console.log("jimi");

module.exports = HomeRoute;