const checkAuth = (req, res, next) => {
	if (req.user) {
		return next();
	}
	
	return next({
		status: 403,
		message: 'Not authorized',
		error: true
	});
};

export default checkAuth;