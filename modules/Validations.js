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
}