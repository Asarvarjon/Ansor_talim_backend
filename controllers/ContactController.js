const { StudentValidation, ContactValidation } = require("../modules/Validations")

module.exports = class ContactController{
    static async StudentPostController(req, res, next){
        try { 
           const {name, phone} = await StudentValidation(req.body) 
           const student = await req.db.students.create({
               student_name: name,
               student_phone: phone
           }); 

           console.log(student);
           res.status(201).json({
               ok: true,
               message: "Contact was sent succesfully"
           })
        } catch (error) {
            console.log(error);
        }
    };
 
    static async ContactPostController(req, res, next){
        try { 
           const {name, phone, email} = await ContactValidation(req.body);

           const contact = await req.db.contacts.create({
               student_contact_name: name,
               student_contact_phone: phone,
               student_contact_email: email
           });  

           console.log(contact);
           res.status(201).json({
               ok: true,
               message: "Information was sent succesfully"
           })
        } catch (error) {
            console.log(error);
        }
    };

}