const express = require('express');
const route = express.Router();
const JavscriptController = require('../../controllers/frontend/Javascript.controller')


module.exports = app => {



    route.post('/view', JavscriptController.view);  //http://localhost:5000/api/frontend/javascript/view



    app.use('/api/frontend/javascript', route);

}