const express = require('express');
const route = express.Router();
const ReactNotesController = require('../../controllers/frontend/ReactNotes.controller')



module.exports = app => {



    route.post('/view', ReactNotesController.view);  //http://localhost:5000/api/frontend/ReactNotes/view

 

    app.use('/api/frontend/ReactNotes', route);

}