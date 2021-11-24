const {Sequelize} = require("sequelize");
const UserModel = require("../../models/UserModel");
const init = require("./init");
const SessionModel = require("../../models/SessionModel");
const relations = require("./relations");
const ApplicantModel = require("../../models/ApplicantModel");
const NewsModel = require("../../models/NewsModel");
const CourseModel = require("../../models/CourseModel");
const CommentsModel = require("../../models/CommentsModel");
const ScenesModel = require("../../models/ScenesModel");
const ResultsModel = require("../../models/ResultsModel"); 
const AddressModel = require("../../models/AddressModel"); 
const ContactModel = require("../../models/ContactModel");
const TeachersModel = require("../../models/TeachersModel");
const AssetsModel = require("../../models/AssetsModel");
const VideosModel = require("../../models/VideosModel");


const sequelize = new Sequelize("postgres://kocpufyr:Wx6eIPHYCOiXJQmD43nvnB4LXyIG3AyC@castor.db.elephantsql.com/kocpufyr", {
    logging: false
});


module.exports = async function(){
    try {
        await sequelize.authenticate();

        console.log("Connection established sucesfully");

        let db = {};

        db.users = await UserModel(sequelize, Sequelize);
        db.sessions = await SessionModel(sequelize, Sequelize);
        db.applicants = await ApplicantModel(sequelize, Sequelize)
        db.news = await NewsModel(sequelize, Sequelize);
        db.courses = await CourseModel(sequelize, Sequelize);
        db.comments = await CommentsModel(sequelize, Sequelize);
        db.scenes = await ScenesModel(sequelize, Sequelize);
        db.results = await ResultsModel(sequelize, Sequelize);
        db.address = await AddressModel(sequelize, Sequelize); 
        db.contacts = await ContactModel(sequelize, Sequelize);
        db.teachers = await TeachersModel(sequelize, Sequelize); 
        db.assets = await AssetsModel(sequelize, Sequelize);
        db.videos = await VideosModel(sequelize, Sequelize)
 
        await init(db);
        await relations(db);
        await sequelize.sync({force: false})

        return db;
    } catch (error) {
        console.log("Postgres ERROR", error);
    }
}