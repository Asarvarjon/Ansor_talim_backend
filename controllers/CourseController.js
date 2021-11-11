const fs = require("fs");
const path = require("path");
const { AddCourseValidation } = require("../modules/Validations");
news
module.exports = class CourseController{
    static async CourseGetController(req, res, next) {
        try {

            const courses = await req.db.courses.findAll()
            

            res.render("courses",{
                courses
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddCoursePostController(req, res, next){
        try { 
            const { course_title, course_desc} = await AddCourseValidation(req.body);

            const photo = req.files.photo;

            let photo_name = photo
				? photo.md5 +
				  "." +
				  photo.mimetype.split("/")[
						photo.mimetype.split("/").length - 1
				  ]
				: null; 

            if (photo) {
                    photo.mv(
                        path.join(__dirname, "..", "public", "uploads", photo_name)
                    );
            }

            const course = await req.db.courses.create({
                course_title,
                course_desc,
                course_photo: photo_name
            }) 

            res.redirect("/admin_panel/courses") 
        } catch (error) {
            res.render("courses",{
                error: error.message
            })
        }
    }

    static async CourseDeleteController(req, res, next) {
         try {
            let course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                raw: true,
                where: {
                    course_id
                }
            })

            if(!course) throw new Error("Course is not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    course.course_photo
                ),
                () => {}
            );

            await req.db.news.destroy({
                where: {
                    course_id: course_id
                }
            });

            res.redirect("/admin_panel/courses/")
         } catch (error) {
             console.log(error);
         }
    }
}