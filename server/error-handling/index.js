const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({
      message: "This route does not exist",
      request: `The requested url was: ${req.originalUrl}`,
    });
  });

  // whenever you call next(err), this middleware will handle the error
  app.use((err, req, res, next) => {
    // always logs the error
    console.error("ERROR", req.method, req.path, err);
    if (err instanceof jwt.TokenExpiredError && !res.headersSent) {
      return res.status(400).json({ message: "Token expired" });
    }
    if (!res.headersSent) {
      // only render if the error ocurred before sending the response
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
