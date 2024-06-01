const express = require('express');
const Router = express;
const { Valid_User } = require('../middleware/auth_middleware');
const { Recording_grateful, Remove_grateful, Fetch_grateful, Single_grateful } = require('../controllers/grate_controller');


const graterouter = Router()

/* user Private Routes start Here */

graterouter.use('/fetch/grate', Valid_User);
graterouter.use('/create/grate', Valid_User);
graterouter.use('/remove/grate/:id', Valid_User);

/* user Private Routes End Here */


/* user Public Routes start Here */

graterouter.get('/fetch/grate', Fetch_grateful);
graterouter.post('/create/grate', Recording_grateful);
// graterouter.post('/create/grate', convertAudioToMp3, Recording_grateful);
graterouter.get('/single/grate/:id', Single_grateful);
graterouter.post('/remove/grate/:id', Remove_grateful);

/* user Public Routes End Here */


module.exports = graterouter;