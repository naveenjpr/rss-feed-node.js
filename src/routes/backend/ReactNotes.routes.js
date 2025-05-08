const express = require('express');
const route = express.Router();
const ReactNotesController = require('../../controllers/backend/ReactNotes.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), ReactNotesController.create); //http://localhost:5000/api/backend/ReactNotes/add

    route.post('/view',upload.none(), ReactNotesController.view);  //http://localhost:5000/api/backend/ReactNotes/view

    route.post('/details/:id',upload.none(), ReactNotesController.details) // http://localhost:5000/api/backend/ReactNotes/details

    route.post('/update',upload.none(), ReactNotesController.update) // http://localhost:5000/api/backend/ReactNotes/update

    route.put('/change-status',upload.none(), ReactNotesController.changeStatus) // http://localhost:5000/api/backend/ReactNotes/change-status

    route.delete('/delete/:id',upload.none(), ReactNotesController.delete)  //http://localhost:5000/api/backend/ReactNotes/delete


    route.post('/multiple-delete',upload.none(), ReactNotesController.multipleDelete)

    app.use('/api/backend/ReactNotes', route);

}