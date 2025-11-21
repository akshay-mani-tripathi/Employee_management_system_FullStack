const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');



router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', authCtrl.me);
router.get('/users', authCtrl.getAllUsers);
router.put('/reset-password', authCtrl.resetPassword);

module.exports = router;