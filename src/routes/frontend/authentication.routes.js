const express = require('express')
const route = express.Router();
const usercontroller = require("../../controllers/frontend/authentication.controller");

module.exports = app => {
    route.post('/register', usercontroller.register); //api/frontend/users/register
    route.post('/login', usercontroller.login); //api/frontend/users/login

    app.use('/api/frontend/users', route)
}