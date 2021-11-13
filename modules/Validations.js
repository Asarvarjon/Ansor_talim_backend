const joi = require("joi");

module.exports = class Validation {
	static async AdminLoginValidation(data) {
		return await joi.object({
			username: joi.string().required().trim().lowercase().error(new Error("Username is invalid")),
			password: joi.string().required().min(5).max(128).error(new Error("Password is invalid")), 
		}).validateAsync(data)
	}

	static async AddNewsValidation(data){
		return await joi.object({
			news_title: joi.string().required().min(5).error(new Error("Sarlavha noto'g'ri")),
			news_short_desc: joi.string().required().min(10).error(new Error("Qisqa ta'rif noto'g'ri")),
			news_full_desc: joi.string().required().min(30).error(new Error("Ta'rif xato")),
		}).validateAsync(data)
	}

	static async AddCourseValidation(data){
		return await joi.object({
			course_title: joi.string().required().min(5).error(new Error("Sarlavha noto'g'ri")), 
			course_desc: joi.string().required().min(30).error(new Error("Ta'rif xato")),
		}).validateAsync(data)
	}
  
	static async AddCommentValidation(data){
		return await joi.object({
			comment_owner: joi.string().required().min(5).error(new Error("Ismingizni to'liqroq yozing")), 
			comment_owner_description: joi.string().required().min(10).error(new Error("Ta'rif xato")),
			comment_text: joi.string().required().min(10).error(new Error("Izohda xato bor")),
			comment_star: joi.number().required().max(5).error(new Error(""))
		}).validateAsync(data)
	}

	static async AddResultsValidation(data){
		return await joi.object({
			result_owner: joi.string().required().min(5).error(new Error("Ismni to'liqroq yozing")), 
			result_owner_university: joi.string().required().error(new Error("Ta'rif xato")),
			result_owner_study_duration: joi.string().required().error(new Error("Izohda xato bor"))
		}).validateAsync(data)
	}


	static async UpdateAdressPostValidation(data){
		return await joi.object({ 
			a_map: joi.string().required().min(5).error(new Error("Iframe xatolik bor")),
			a_location: joi.string().required().min(5).error(new Error("Manzilda xatolik bor")),
			a_email: joi.string().email().required().min(5).error(new Error("Email xato")),
			a_phone: joi.string().required().min(5).error(new Error("Telefon raqam noto'g'ri berilgan")) ,
			a_facebook_link: joi.string().required().min(5).error(new Error("Havola noto'g'ri")),
		    a_telegram_link: joi.string().required().min(5).error(new Error("Havola noto'g'ri")),
		    a_youtube_link: joi.string().required().min(5).error(new Error("Havola noto'g'ri"))
		}).validateAsync(data)
	}

	static async StudentValidation(data){
		return await joi.object({  
			name: joi.string().min(3).max(32).required().error(new Error("Ismingizni to'g'ri kiriting")),
			phone: joi.string().min(3).required().error(new Error("Telefon raqamingizni to'g'ri kiriting"))
		}).validateAsync(data)
	}

	static async ContactValidation(data){
		return await joi.object({  
			name: joi.string().min(3).max(32).required().error(new Error("Ismingizni to'g'ri kiriting")),
			phone: joi.string().min(3).required().error(new Error("Telefon raqamingizni to'g'ri kiriting")),
			email: joi.string().email().required().error(new Error("Emailingizni to'g'ri kiriting"))
		}).validateAsync(data)
	}

	static async TeacherValidation(data){
		return await joi.object({  
			teacher_name: joi.string().min(3).max(32).required().error(new Error("Ismni to'g'ri kiriting")),
			teacher_subject: joi.string().min(3).max(64).required().error(new Error("Mutaxasislik nomini to'g'ri kiriting")),
			teacher_experience: joi.number().required().error(new Error("Tajribani to'g'ri kiriting")),
			teacher_students: joi.number().required().error(new Error("O'quvchilar sonini to'g'ri kiriting"))
		}).validateAsync(data)
	}

	static async AssetsValidation(data){
		return await joi.object({  
			main_title: joi.string().required().error(new Error("Sarlavhani to'g'ri kiriting")),
			main_motto: joi.string().required().error(new Error("Shiorni to'g'ri kiriting")), 
		}).validateAsync(data)
	}
}