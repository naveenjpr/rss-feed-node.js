const express = require('express');
const route = express.Router();
const WordPressController = require('../../controllers/backend/WordPress.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), WordPressController.create); //http://localhost:5000/api/backend/WordPress/add

    route.post('/view',upload.none(), WordPressController.view);  //http://localhost:5000/api/backend/WordPress/view

    route.post('/details/:id',upload.none(), WordPressController.details) // http://localhost:5000/api/backend/WordPress/details

    route.put('/update/:id',upload.none(), WordPressController.update) // http://localhost:5000/api/backend/WordPress/update

    route.put('/change-status',upload.none(), WordPressController.changeStatus) // http://localhost:5000/api/backend/WordPress/change-status

    route.delete('/delete/:id',upload.none(), WordPressController.delete)  //http://localhost:5000/api/backend/WordPress/delete


    route.post('/multiple-delete',upload.none(), WordPressController.multipleDelete)

    app.use('/api/backend/WordPress', route);

}