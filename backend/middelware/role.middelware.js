export const isCounter = (req, res, next) => {
  if (req.user && (req.user.role == "counter" || req.user.role == "admin")) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};
