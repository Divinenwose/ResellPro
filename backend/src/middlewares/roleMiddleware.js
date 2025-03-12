const jwt = require("jsonwebtoken");
const BlackListedToken = require("../models/BlackListedToken");

// Middleware to check if the user has the required role
const roleMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      // Extract token from Authorization header
      const authHeader = req.header("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Access denied! No token provided or invalid format.",
          status_code: 401
        });
      }

      const token = authHeader.split(" ")[1]; // Get the actual token

      // Check if the token is blacklisted
      const blackListedToken = await BlackListedToken.findOne({ token });
      if (blackListedToken) {
        return res.status(401).json({
          success: false,
          message: "Token is blacklisted! Please log in again.",
          status_code: 401
        });
      }

      // Verify JWT Token
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).json({
              success: false,
              message: "Token expired! Please log in again.",
              status_code: 401
            });
          }
          return res.status(400).json({
            success: false,
            message: "Invalid token!",
            status_code: 400
          });
        }

        // Check user role
        if (!requiredRoles.includes(decoded.role)) {
          return res.status(403).json({
            success: false,
            message: `Access denied! One of these roles required: ${requiredRoles.join(", ")}`,
            status_code: 403
          });
        }

        req.user = decoded; // Attach user info to request
        next();
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        status_code: 500
      });
    }
  };
};

// Export role-based middlewares
module.exports = {
  adminMiddleware: roleMiddleware(["admin"]),
  sellerMiddleware: roleMiddleware(["seller"]),
  buyerMiddleware: roleMiddleware(["buyer"]),
  userMiddleware: roleMiddleware(["admin", "seller", "buyer"]),
};
