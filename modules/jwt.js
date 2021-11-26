
const jwt = require("jsonwebtoken");

module.exports.createToken = function (user) {
	return jwt.sign(user, "secret");
};

module.exports.verifyToken = function (token) {
	return jwt.verify(token, "secret");
};