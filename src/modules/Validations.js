const joi = require("joi");

module.exports = class Validation {
	static async AdminLoginValidation(data, Error) {
		return await joi.object({
			email: joi.string().email().required().trim().error(new Error(400, "Email is invalid")),
			password: joi.string().required().min(5).max(128).error(new Error(400, "Password is invalid")), 
		}).validateAsync(data)
	}
}