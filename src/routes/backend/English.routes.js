const express = require('express');
const route = express.Router();
const EnglishController = require('../../controllers/backend/English.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), EnglishController.create); //http://localhost:5000/api/backend/English/add

    route.post('/view',upload.none(), EnglishController.view);  //http://localhost:5000/api/backend/English/view

    route.post('/details/:id',upload.none(), EnglishController.details) // http://localhost:5000/api/backend/English/details

    route.put('/update/:id',upload.none(), EnglishController.update) // http://localhost:5000/api/backend/English/update

    route.put('/change-status',upload.none(), EnglishController.changeStatus) // http://localhost:5000/api/backend/English/change-status

    route.delete('/delete/:id',upload.none(), EnglishController.delete)  //http://localhost:5000/api/backend/English/delete


    route.post('/multiple-delete',upload.none(), EnglishController.multipleDelete)

    app.use('/api/backend/English', route);

}