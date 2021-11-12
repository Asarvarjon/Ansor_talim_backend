 
 
module.exports = class AdressController{
    static async AdressGetController(req, res, next) {
        try {

            const adress = await req.db.courses.findOne()
            console.log(adress);

            res.render("adress",{
                adress
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdatePostController(req, res, next){
        try { 
            const { course_title, course_desc} = await AddCourseValidation(req.body);

             
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
}