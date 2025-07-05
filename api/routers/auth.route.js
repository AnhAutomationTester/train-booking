const express = require('express');
const router = express.Router();
const { googleLogin } = require('../controllers/auth.controler');

router.post('/google', googleLogin);

module.exports = router;
