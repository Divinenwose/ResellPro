const jwt = require("jsonwebtoken");

// Middleware to check if the user has the required role
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1]; // Get token from header
      if (!token) return res.status(401).json({ message: "Access denied! No token provided." });

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token

      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: `Access denied! ${requiredRole} role required.` });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token!" });
    }
  };
};

// Export role-based middlewares
module.exports = {
  adminMiddleware: roleMiddleware("admin"),
  sellerMiddleware: roleMiddleware("seller"),
  buyerMiddleware: roleMiddleware("buyer"),
};
