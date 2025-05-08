const express = require('express');
const route = express.Router();
const JavscriptController = require('../../controllers/backend/Javascript.controller')
const multer  = require('multer')
const path=require('path')
const upload=multer({dest: "uploads/javascript"})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/javascript')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();

      var imagePath=path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix+imagePath)
    }
  })

  const uploadImage=multer({storage:storage}).single('image');

module.exports = app => {


    route.post('/add', uploadImage,JavscriptController.create); //http://localhost:5000/api/backend/javascript/add

    route.post('/view', JavscriptController.view);  //http://localhost:5000/api/backend/javascript/view

    route.post('/details/:id', JavscriptController.details) // http://localhost:5000/api/backend/javascript/details

    route.post('/update',uploadImage, JavscriptController.update) // http://localhost:5000/api/backend/javascript/update

    route.put('/change-status', JavscriptController.changeStatus) // http://localhost:5000/api/backend/javascript/change-status

    route.delete('/delete/:id', JavscriptController.delete)  //http://localhost:5000/api/backend/javascript/delete


    route.post('/multiple-delete', JavscriptController.multipleDelete)

    app.use('/api/backend/javascript', route);

}