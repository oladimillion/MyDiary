import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function Private (req, res, next) {
  // verifying headers token
  const authorizationHeader = req.headers["authorization"];

  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          error: "Please login to access the resource"
        });
      } else {
        req._user_id = decoded.user_id;
        next();
      }
    });
  } else {
    res.status(403).json({
      error: "Please login to access the resource"
    });
  }
}

