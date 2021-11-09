const joi = require("joi");

module.exports = class Validation {
	static async AdminLoginValidation(data, Error) {
		return await joi.object({
			username: joi.string().required().trim().lowercase().error(new Error(400, "Username is invalid")),
			password: joi.string().required().min(5).max(128).error(new Error(400, "Password is invalid")), 
		}).validateAsync(data)
	}
}