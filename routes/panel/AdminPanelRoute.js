const { PanelGetController } = require("../../controllers/AdminPanelController");
const { UserSessionGetController } = require("../../controllers/UsersController");
const AuthMiddleware = require("../../middlewares/AuthMiddleware");

const AdminPanelRoute = require("express").Router();
AdminPanelRoute.get("/", AuthMiddleware, PanelGetController)
AdminPanelRoute.get("/sessions", AuthMiddleware, UserSessionGetController)

module.exports = AdminPanelRoute;