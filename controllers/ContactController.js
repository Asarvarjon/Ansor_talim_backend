const { StudentValidation } = require("../modules/Validations")

module.exports = class ContactController{
    static async ContactPostController(req, res, next){
        try {

            console.log(req.body);
           const {name, phone} = await StudentValidation(req.body)

           console.log(name, phone);

           const student = await req.db.students.create({
               student_name: name,
               student_phone: phone
           });

           console.log(student);


           res.status(201).json({
               ok: true,
               message: "Student added succesfully"
           })
        } catch (error) {
            console.log(error);
        }
    }
}