import mapCookies from "../utils/cookie.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const env = dotenv.config();

const initialRouteMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);
  

  if (!cookies?.auth) {
    next();
    return;
  }

  jwt.verify(cookies.auth, env.parsed.SECRET_KEY, (err, user) => {
    if (err) {
      next();
    } else {
      req.user = user;
      res.redirect("/home");
    }
  });
};

export default initialRouteMiddleware;
