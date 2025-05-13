const express = require('express');
const route = express.Router();
const Node_jsController = require('../../controllers/frontend/Node_js.controller')


module.exports = app => {



    route.post('/view', Node_jsController.view);  //http://localhost:5000/api/frontend/node-js-Notes/view



    app.use('/api/frontend/node-js-Notes', route);

}