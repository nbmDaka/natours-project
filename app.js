const express = require("express");
const morgan = require("morgan");
const app = express();
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 1. MIDDLEWARES
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
