import React from 'react'
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // 3. Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authentication format",
      });
    }

    // 4. Extract token
    const token = authHeader.split(" ")[1];

    // 5. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 6. Store user information in request
    req.user = decoded.userId;

    // 7. Continue to next middleware/controller
    next();

  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;