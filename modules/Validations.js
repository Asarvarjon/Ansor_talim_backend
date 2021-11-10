const joi = require("joi");

module.exports = class Validation {
	static async AdminLoginValidation(data) {
		return await joi.object({
			username: joi.string().required().trim().lowercase().error(new Error("Username is invalid")),
			password: joi.string().required().min(5).max(128).error(new Error("Password is invalid")), 
		}).validateAsync(data)
	}
}