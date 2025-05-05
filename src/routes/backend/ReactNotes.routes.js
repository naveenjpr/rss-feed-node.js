const express = require('express');
const route = express.Router();
const ReactNotesController = require('../../controllers/backend/ReactNotes.controller')



module.exports = app => {


    route.post('/add', ReactNotesController.create); //http://localhost:5000/api/backend/ReactNotes/add

    route.post('/view', ReactNotesController.view);  //http://localhost:5000/api/backend/ReactNotes/view

    route.post('/details/:id', ReactNotesController.details) // http://localhost:5000/api/backend/ReactNotes/details

    route.put('/update', ReactNotesController.update) // http://localhost:5000/api/backend/ReactNotes/update

    route.put('/change-status', ReactNotesController.changeStatus) // http://localhost:5000/api/backend/ReactNotes/change-status

    route.delete('/delete/:id', ReactNotesController.delete)  //http://localhost:5000/api/backend/ReactNotes/delete


    route.post('/multiple-delete', ReactNotesController.multipleDelete)

    app.use('/api/backend/ReactNotes', route);

}