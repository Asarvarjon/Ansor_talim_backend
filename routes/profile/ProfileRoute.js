const { ProfileGetController } = require("../../controllers/ProfileController");

const TeacherRoute = require("express").Router();

TeacherRoute.get("/", ProfileGetController)

module.exports = TeacherRoute;