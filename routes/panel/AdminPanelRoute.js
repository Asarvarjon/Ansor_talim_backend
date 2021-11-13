const expressFileUpload = require("express-fileupload")

const { PanelGetController, UpdateAssetsPostController } = require("../../controllers/AdminPanelController");
const { AdressGetController, UpdateAdressPostController } = require("../../controllers/AdressController");
const { ApplicantsGetController, ApplicantToCoursePostController } = require("../../controllers/ApplicantsController");
const { CommentsGetController, AddCommentsPostController, CommentDeleteController } = require("../../controllers/CommentsController");
const {  ContactsGetController } = require("../../controllers/ContactController");
const { CourseGetController, AddCoursePostController, CourseDeleteController } = require("../../controllers/CourseController");
const { NewsGetController, AddNewsPostController, NewsDeleteController } = require("../../controllers/NewsController");
const { ResultsGetController, AddResultPostController, ResultsDeleteController } = require("../../controllers/ResultsController");
const { ScenesGetController, AddScenesPostController, SceneDeleteController, VideoAddController, VideoDeleteController } = require("../../controllers/ScenesController");
const { TeacherGetController, AddTeacherPostController, TeacherDeleteController } = require("../../controllers/TeachersController");
const { UserSessionGetController, SessionDeleteController } = require("../../controllers/UsersController");
const AuthMiddleware = require("../../middlewares/AuthMiddleware");

const AdminPanelRoute = require("express").Router();

AdminPanelRoute.use(AuthMiddleware)
AdminPanelRoute.get("/", AuthMiddleware, PanelGetController);
AdminPanelRoute.get("/sessions", AuthMiddleware, UserSessionGetController);
AdminPanelRoute.get("/sessions/:session_id", SessionDeleteController)
AdminPanelRoute.get("/applicants", ApplicantsGetController);
// AdminPanelRoute.post("/applicants", ApplicantToCoursePostController)

// News page routes
AdminPanelRoute.get("/news", NewsGetController);
AdminPanelRoute.post("/news", expressFileUpload(), AddNewsPostController);
AdminPanelRoute.get("/news/:news_id", NewsDeleteController);

// Courses page routes
AdminPanelRoute.get("/courses", CourseGetController);
AdminPanelRoute.post("/courses", expressFileUpload(), AddCoursePostController);
AdminPanelRoute.get("/courses/:course_id", CourseDeleteController);


// Comments page routes
AdminPanelRoute.get("/comments", CommentsGetController );
AdminPanelRoute.post("/comments", expressFileUpload(), AddCommentsPostController);
AdminPanelRoute.get("/comments/:comment_id", CommentDeleteController)

// Scenes page routes

AdminPanelRoute.get("/scenes", ScenesGetController );
AdminPanelRoute.post("/scenes", expressFileUpload(), AddScenesPostController);
AdminPanelRoute.get("/scenes/:scene_id", SceneDeleteController);

// Results page routes

AdminPanelRoute.get("/results", ResultsGetController );
AdminPanelRoute.post("/results", expressFileUpload(), AddResultPostController);
AdminPanelRoute.get("/results/:result_id", ResultsDeleteController);

/// Teachers 
AdminPanelRoute.get("/teachers", TeacherGetController );
AdminPanelRoute.post("/teachers", expressFileUpload(), AddTeacherPostController);
AdminPanelRoute.get("/teachers/:teacher_id", TeacherDeleteController);


/// Adress page routes
AdminPanelRoute.get("/address", AdressGetController );
AdminPanelRoute.post("/address", UpdateAdressPostController ); 



/// CONTACTS

AdminPanelRoute.get("/contacts", ContactsGetController)

/// assets 
AdminPanelRoute.post("/assets", UpdateAssetsPostController)

//// video

AdminPanelRoute.post("/videos", VideoAddController);
AdminPanelRoute.get("/videos/:video_id", VideoDeleteController)


module.exports = AdminPanelRoute;