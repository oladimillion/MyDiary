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
        res.status(401).json({
          error: "Authentication failed. Try again"
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: "Authentication failed. Try again"
    });
  }
}

