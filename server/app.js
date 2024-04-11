require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require("cors");

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.use("/", require("./routes/index.routes"));

require("./error-handling")(app);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
