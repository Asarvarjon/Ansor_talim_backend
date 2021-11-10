const { ProfileGetController } = require("../../controllers/ProfileController");
const AuthMiddleware = require("../../middlewares/AuthMiddleware");

const TeacherRoute = require("express").Router();

TeacherRoute.get("/", AuthMiddleware, ProfileGetController)

module.exports = TeacherRoute;