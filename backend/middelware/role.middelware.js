export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied" });
};

export const isCounter = (req, res, next) => {
  if (req.user && (req.user.role == "counter" || req.user.role == "admin")) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};

export const isKitchen = (req, res, next) => {
  if (req.user && req.user.role == "kitchen") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};
