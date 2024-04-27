const apiAuthMiddleware = (req, res, next) => {
    if (!req.session.isAuthenticated) {
      res.sendStatus(401);
    } else {
      next();
    }
  };
  
  export default apiAuthMiddleware;