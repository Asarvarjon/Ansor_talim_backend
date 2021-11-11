const expressFileUpload = require("express-fileupload")

const { PanelGetController } = require("../../controllers/AdminPanelController");
const { ApplicantsGetController, ApplicantToCoursePostController } = require("../../controllers/ApplicantsController");
const { NewsGetController, AddNewsPostController, NewsDeleteController } = require("../../controllers/NewsController");
const { UserSessionGetController, SessionDeleteController } = require("../../controllers/UsersController");
const AuthMiddleware = require("../../middlewares/AuthMiddleware");

const AdminPanelRoute = require("express").Router();

AdminPanelRoute.use(AuthMiddleware)
AdminPanelRoute.get("/", AuthMiddleware, PanelGetController);
AdminPanelRoute.get("/sessions", AuthMiddleware, UserSessionGetController);
AdminPanelRoute.get("/sessions/:session_id", SessionDeleteController)
AdminPanelRoute.get("/applicants", ApplicantsGetController);
// AdminPanelRoute.post("/applicants", ApplicantToCoursePostController)
AdminPanelRoute.get("/news", NewsGetController);
AdminPanelRoute.post("/news", expressFileUpload(), AddNewsPostController);
AdminPanelRoute.get("/news/:news_id", NewsDeleteController);




module.exports = AdminPanelRoute;