const fs = require("fs");
const path = require("path"); 
 
module.exports = class CourseController{
    static async ScenesGetController(req, res, next) {
        try {

            const scenes = await req.db.scenes.findAll({
                raw: true,
                order:[['updatedAt', 'DESC']]
            })
            
            console.log(scenes);
            res.render("scenes",{
                scenes
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddScenesPostController(req, res, next){
        try {   
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

            const scene = await req.db.scenes.create({ 
                scene_photo: photo_name
            }) 

            res.redirect("/admin_panel/scenes") 
        } catch (error) {
            res.render("scenes",{
                error: error.message
            })
        }
    }

    static async SceneDeleteController(req, res, next) {
         try {
            let scene_id = req.params.scene_id;

            const scene = await req.db.scenes.findOne({
                raw: true,
                where: {
                    scene_id: scene_id
                }
            })

            if(!scene) throw new Error("Scene is not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    scene.scene_photo
                ),
                () => {}
            );

            await req.db.scenes.destroy({
                where: {
                    scene_id: scene_id
                }
            });

            res.redirect("/admin_panel/scenes/")
         } catch (error) {
             console.log(error);
         }
    }


    static async VideoAddController(req, res, next){
        try {
            const {youtube_link} = req.body;

            const video = await req.db.videos.create({
                youtube_link: youtube_link
            })

            res.redirect("/admin_panel/scenes/")
        } catch (error) {
            console.log(error);
        }
    }


    static async VideoDeleteController(req, res, next) {
        try {
           let video_id = req.params.video_id;

           const video = await req.db.videos.findOne({
               raw: true,
               where: {
                   video_id: video_id
               }
           })

           if(!video) throw new Error("Scene is not found"); 

           await req.db.videos.destroy({
               where: {
                   video_id: video_id
               }
           });

           res.redirect("/admin_panel/scenes/")
        } catch (error) {
            res.render("scenes", {
                error: error.message
            })
        }
   }
}