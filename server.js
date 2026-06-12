require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
let Parser = require("rss-parser");
let parser = new Parser();
const server = express();

// Security Middleware
const helmet = require("helmet");
server.use(helmet());

server.use(compression());
server.use(cors());

// Rate Limiter Setup
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: {
    status: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
server.use(limiter);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/uploads/javascript", express.static("uploads/javascript"));
const adminModel = require("./src/models/AdminModel.Schema");

//backend Api
require("./src/routes/backend/QuizApp.routes")(server);
require("./src/routes/backend/Javascript.routes")(server);
require("./src/routes/backend/ReactNotes.routes")(server);
require("./src/routes/backend/Node_js.routes")(server);
require("./src/routes/backend/WordPress.routes")(server);
require("./src/routes/backend/HTML_CSS.routes ")(server);
require("./src/routes/backend/English.routes")(server);
require("./src/routes/backend/livewebsite.routes")(server);
require("./src/routes/backend/adminAuth.routes")(server);
require("./src/routes/backend/Menka.routes")(server);
require("./src/routes/backend/Nextjs.routes")(server);
require("./src/routes/backend/AWS.routes")(server);
require("./src/routes/backend/TypeScript.routes")(server);
require("./src/routes/backend/Github.routes")(server);
require("./src/routes/backend/SQL.routes")(server);
require("./src/routes/backend/Angular.routes")(server);
require("./src/routes/backend/Python.routes")(server);
require("./src/routes/backend/Docker.routes")(server);
require("./src/routes/backend/Testing.routes")(server);
require("./src/routes/backend/PostgreSQL.routes")(server);
require("./src/routes/backend/Supabase.routes")(server);
require("./src/routes/backend/SEO.routes")(server);
require("./src/routes/backend/ReduxToolkit.routes")(server);
require("./src/routes/backend/prompt.routes")(server);
require("./src/routes/backend/EnvironmentVariables.routes")(server);
require("./src/routes/backend/nginx.routes")(server);
require("./src/routes/backend/Firebase.routes")(server);
require("./src/routes/backend/vocabulary.routes")(server);
require("./src/routes/backend/php.routes")(server);
require("./src/routes/backend/GitHubActions.routes")(server);
require("./src/routes/backend/reactnative.routes")(server);
require("./src/routes/backend/Ai.routes")(server);

// frontend api
require("./src/routes/frontend/Javascript.routes")(server);
require("./src/routes/frontend/ReactNotes.routes")(server);
require("./src/routes/frontend/Node_js.routes")(server);
require("./src/routes/frontend/WordPress.routes")(server);
require("./src/routes/frontend/authentication.routes")(server);
require("./src/routes/frontend/HTML_CSS.routes")(server);
require("./src/routes/frontend/English.routes")(server);
require("./src/routes/frontend/livewebsite.routes")(server);

server.get("/", (request, response) => {
  response.send("Server Working Fine.....");
});



server.get("*", (request, response) => {
  response.send("Page not found.....");
});

mongoose
  .connect(
    "mongodb+srv://naveensainijpr:Gionee123@cluster0.fdq1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(async () => {
    const checkAdmin = await adminModel.find();
    if (checkAdmin.length == 0) {
      let admin = await adminModel({
        adminName: "admin",
        adminPassword: "admin123",
      });
      await admin.save();
    }

    server.listen("5000", () => {
      console.log("Database Connected!");
    });
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error);
  });

//naveensainijpr
//Gionee123
