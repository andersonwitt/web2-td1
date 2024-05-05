import mapCookies from "../utils/cookie.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const env = dotenv.config();

const apiAuthMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);

  if (!cookies?.auth) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(cookies.auth, env.parsed.SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      req.user = user;
      next();
    }
  });
};

export default apiAuthMiddleware;
