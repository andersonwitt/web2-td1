import mapCookies from "../utils/cookie.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

const env = dotenv.config();

const authMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);

  if (!cookies?.auth) {
    res.redirect("/");
    return;
  }

  jwt.verify(cookies.auth, env.parsed.SECRET_KEY, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      req.user = user;
      next();
    }
  });
};

export default authMiddleware;
