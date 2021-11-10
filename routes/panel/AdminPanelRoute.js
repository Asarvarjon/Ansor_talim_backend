const { PanelGetController } = require("../../controllers/AdminPanelController");
const { UserSessionGetController, SessionDeleteController } = require("../../controllers/UsersController");
const AuthMiddleware = require("../../middlewares/AuthMiddleware");

const AdminPanelRoute = require("express").Router();
AdminPanelRoute.get("/", AuthMiddleware, PanelGetController);
AdminPanelRoute.get("/sessions", AuthMiddleware, UserSessionGetController);
AdminPanelRoute.get("/sessions/:session_id", SessionDeleteController)

module.exports = AdminPanelRoute;