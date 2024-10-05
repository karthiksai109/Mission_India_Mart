const express = require('express');
const router = express.Router();

const { registerUser, getUser, updateUsers, login } = require('../Controllers/userController');

//=======APIs for User=========
router.post("/register",  registerUser);
router.post("/login", login);


module.exports = router