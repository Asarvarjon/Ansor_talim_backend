module.exports = function NotFoundMiddleware(req, res, next) {
	res.render("notfound", {})
}