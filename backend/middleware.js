const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid auth",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
    } else {
      return res.staus(401).json({});
    }

    next();
  } catch (err) {
    return res.staus(401).json({});
  }
};

module.exports = {
  authMiddleware,
};
