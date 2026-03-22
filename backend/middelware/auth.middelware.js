import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No Token or Invalid format" });
    }
    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      req["user"] = decode;
      return next();
    }
  } catch (error) {
    console.log("Error while cheking auth in auth middelware", error.message);
    return res.status(401).json({ message: "Token not valid or Unauthorised" });
  }
};
