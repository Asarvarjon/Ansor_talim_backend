const expressFileUpload = require("express-fileupload")

const { PanelGetController } = require("../../controllers/AdminPanelController");
const { ApplicantsGetController, ApplicantToCoursePostController } = require("../../controllers/ApplicantsController");
const { CourseGetController, AddCoursePostController, CourseDeleteController } = require("../../controllers/CourseController");
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

// News page routers
AdminPanelRoute.get("/news", NewsGetController);
AdminPanelRoute.post("/news", expressFileUpload(), AddNewsPostController);
AdminPanelRoute.get("/news/:news_id", NewsDeleteController);

// Courses page routers
AdminPanelRoute.get("/courses", CourseGetController);
AdminPanelRoute.post("/courses", expressFileUpload(), AddCoursePostController);
AdminPanelRoute.get("/courses/:course_id", CourseDeleteController);




module.exports = AdminPanelRoute;