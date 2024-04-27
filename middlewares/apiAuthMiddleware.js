import jwt from "jsonwebtoken";
const secretKey = "your_secret_key";

const apiAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      req.user = user;
      next();
    }
  });
};

export default apiAuthMiddleware;
