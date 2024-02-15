const express = require('express');
const router = express.Router();
const { signupController, loginController, forgotPasswordController } = require('../../controllers/authController');


router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/forgot-password', forgotPasswordController);



module.exports = router;