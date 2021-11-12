 
const fs = require("fs");
const path = require("path");
const { AddResultsValidation } = require("../modules/Validations");

module.exports = class ResultsController{
    static async ResultsGetController(req, res, next) {
        try {

            const results = await req.db.results.findAll()
            

            res.render("results",{
                results
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddResultPostController(req, res, next){
        try { 
            const {result_owner, result_owner_university, result_owner_study_duration } = await AddResultsValidation(req.body);

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

            const result = await req.db.results.create({
                result_owner,
                result_owner_university,
                result_owner_study_duration,
                result_owner_photo: photo_name
            }) 

            res.redirect("/admin_panel/results") 
        } catch (error) {
            res.render("news",{
                error: error.message
            })
        }
    }

    static async ResultsDeleteController(req, res, next) {
         try {
            let result_id = req.params.result_id;

            const result = await req.db.results.findOne({
                raw: true,
                where: {
                    result_id: result_id
                }
            })

            if(!result) throw new Error("Results not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    result.result_owner_photo
                ),
                () => {}
            );

            await req.db.results.destroy({
                where: {
                    result_id: result_id
                }
            });

            res.redirect("/admin_panel/results/")
         } catch (error) {
             console.log(error);
         }
    }
}