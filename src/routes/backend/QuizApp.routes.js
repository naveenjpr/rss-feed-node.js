const express = require('express');
const route = express.Router();
const QuizApp = require('../../controllers/backend/QuizApp.controllers')




module.exports = app => {

    route.post('/add', QuizApp.create); //http://localhost:5000/api/backend/QuizApp/add

    route.post('/view', QuizApp.view);  //http://localhost:5000/api/backend/QuizApp/view

    // route.post('/details/:id', QuizApp.details)

    // route.put('/update', QuizApp.update)

    // route.put('/change-status', QuizApp.changeStatus)

    // route.post('/delete', QuizApp.delete)

    // route.post('/multiple-delete', QuizApp.multipleDelete)

    app.use('/api/backend/QuizApp',route);

}
