const initialRouteMiddleware = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/home");
  }
};

module.exports = initialRouteMiddleware;
