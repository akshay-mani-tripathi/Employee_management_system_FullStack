const router = require('express').Router();
const taskCtrl = require('../controllers/task.controller');



// router.use(auth);
router.post('/', taskCtrl.createTask);
router.put('/:id', taskCtrl.updateTask);
router.get('/userStats',taskCtrl.getTasks);
router.get('/me', taskCtrl.getLoggedInUserTasks); 


module.exports = router;