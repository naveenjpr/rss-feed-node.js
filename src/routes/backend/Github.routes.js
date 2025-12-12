const express = require('express');
const route = express.Router();
const GithubController = require('../../controllers/backend/Github.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), GithubController.create); //http://localhost:5000/api/backend/Github/add

    route.post('/view',upload.none(), GithubController.view);  //http://localhost:5000/api/backend/Github/view

    route.post('/details/:id',upload.none(), GithubController.details) // http://localhost:5000/api/backend/Github/details

    route.put('/update/:id',upload.none(), GithubController.update) // http://localhost:5000/api/backend/Github/update

    route.put('/change-status',upload.none(), GithubController.changeStatus) // http://localhost:5000/api/backend/Github/change-status

    route.delete('/delete/:id',upload.none(), GithubController.delete)  //http://localhost:5000/api/backend/Github/delete


    route.post('/multiple-delete',upload.none(), GithubController.multipleDelete)

    app.use('/api/backend/Github', route);

}
//http://localhost:5000/api/backend/Github/add
//http://localhost:5000/api/backend/Github/view
//http://localhost:5000/api/backend/Github/details/:id
//http://localhost:5000/api/backend/Github/update/:id
//http://localhost:5000/api/backend/Github/change-status
//http://localhost:5000/api/backend/Github/delete/:id
//http://localhost:5000/api/backend/Github/multiple-delete