const express = require("express");
const route = express.Router();
const PostgreSQLController = require("../../controllers/backend/PostgreSQL.controller");
const multer = require("multer");
const upload = multer();

module.exports = (app) => {
  route.post("/add", upload.none(), PostgreSQLController.create); //http://localhost:5000/api/backend/PostgreSQL/add

  route.post("/view", upload.none(), PostgreSQLController.view); //http://localhost:5000/api/backend/PostgreSQL/view

  route.post("/details/:id", upload.none(), PostgreSQLController.details); // http://localhost:5000/api/backend/PostgreSQL/details

  route.put("/update/:id", upload.none(), PostgreSQLController.update); // http://localhost:5000/api/backend/PostgreSQL/update

  route.put("/change-status", upload.none(), PostgreSQLController.changeStatus); // http://localhost:5000/api/backend/PostgreSQL/change-status

  route.delete("/delete/:id", upload.none(), PostgreSQLController.delete); //http://localhost:5000/api/backend/PostgreSQL/delete

  app.use("/api/backend/PostgreSQL", route);
};
