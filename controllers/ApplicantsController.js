module.exports = class ApplicantsController{
    static async ApplicantsGetController(req, res, next){
         

        const applicants = await req.db.applicants.findAll({
                order:[['updatedAt', 'DESC']]
        })

        console.log(applicants);

        res.render("applicant", {
            applicants
        })
    }



}