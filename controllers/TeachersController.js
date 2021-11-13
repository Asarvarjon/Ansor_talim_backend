const fs = require("fs");
const path = require("path");
const { TeacherValidation } = require("../modules/Validations");


module.exports = class TeachersController{
    static async TeacherGetController(req, res, next) {
        try {

            const teachers = await req.db.teachers.findAll({
                order:[['updatedAt', 'DESC']]
            })
            

            res.render("teachers",{
                teachers
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddTeacherPostController(req, res, next){
        try { 
            const {teacher_name, teacher_experience, teacher_students, teacher_subject} = await TeacherValidation(req.body);

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

            const teacher = await req.db.teachers.create({
                teacher_name,
                teacher_experience,
                teacher_students,
                teacher_subject,
                teacher_photo: photo_name
            }) 

            res.redirect("/admin_panel/teachers") 
        } catch (error) {
            res.render("teachers",{
                error: error.message
            })
        }
    }

    static async TeacherDeleteController(req, res, next) {
         try {
            let teacher_id = req.params.teacher_id;

            const teacher = await req.db.teachers.findOne({
                raw: true,
                where: {
                    teacher_id: teacher_id
                }
            })

            if(!teacher) throw new Error("Teacher not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    teacher.teacher_photo
                ),
                () => {}
            );

            await req.db.teacher.destroy({
                where: {
                    teacher_id: teacher_id
                }
            });

            res.redirect("/admin_panel/teachers/")
         } catch (error) {
             console.log(error);
         }
    }
}