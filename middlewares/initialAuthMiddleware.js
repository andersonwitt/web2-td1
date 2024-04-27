import jwt from "jsonwebtoken";
import mapCookies from "../utils/cookie.js";
const secretKey = "your_secret_key";

const initialRouteMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);
  

  if (!cookies?.auth) {
    next();
    return;
  }

  jwt.verify(cookies.auth, secretKey, (err, user) => {
    if (err) {
      next();
    } else {
      req.user = user;
      res.redirect("/home");
    }
  });
};

export default initialRouteMiddleware;
