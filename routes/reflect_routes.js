const express = require('express');
const Router = express;
const { Valid_User } = require('../middleware/auth_middleware');
const { Recording_reflectful, Remove_reflectful, Fetch_reflectful } = require('../controllers/reflect_controller');


const reflectrouter = Router()

/* user Private Routes start Here */

reflectrouter.use('/fetch/reflect', Valid_User);
reflectrouter.use('/create/reflect', Valid_User);

/* user Private Routes End Here */


/* user Public Routes start Here */

reflectrouter.get("/fetch/reflect", Fetch_reflectful);
reflectrouter.post("/create/reflect", Recording_reflectful);
reflectrouter.post("/remove/reflect/:id", Remove_reflectful);

/* user Public Routes End Here */


module.exports = reflectrouter;