const express = require('express');
const route = express.Router();
const WordPressController = require('../../controllers/frontend/WordPress.controller')



module.exports = app => {



    route.post('/view', WordPressController.view);  //http://localhost:5000/api/frontend/WordPress/view


    app.use('/api/frontend/WordPress', route);

}