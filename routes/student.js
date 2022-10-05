const express = require('express');
const router = express.Router();
const studentMiddleware = require("../middleware/studentMiddleware")


const studentController = require('../controller/studentController');


router.get('/me',studentMiddleware.studentAuth)

router.get('/:id',studentController.getStudent);

router.get('/',studentController.getStudents);

router.post('/',studentMiddleware.insertStudent,studentController.insertStudent);

router.put('/:id',studentMiddleware.updateStudent,studentController.updateStudent);

router.delete('/:id',studentController.deleteStudent);



router.post('/signin',studentController.Signin);


module.exports = router;