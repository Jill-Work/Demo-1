const express = require('express');
const router = express.Router();
const studentMiddleware = require("../middleware/studentMiddleware")


const studentController = require('../controller/studentController');



router.get('/:id',studentMiddleware.studentAuth,studentController.getStudent);

router.get('/',studentController.getStudents);

router.post('/',studentMiddleware.insertStudent,studentController.insertStudent);

router.put('/:id',studentMiddleware.studentAuth,studentMiddleware.updateStudent,studentController.updateStudent);

router.delete('/:id',studentMiddleware.studentAuth,studentController.deleteStudent);



router.post('/signin',studentController.Signin);

router.post('/login/:id',studentMiddleware.studentAuth,studentController.auth)

module.exports = router;