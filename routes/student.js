const express = require('express');
const router = express.Router();
const studentMiddelware = require("../middleware/studentMiddleware")


const studentController = require('../controller/studentController');


router.get('/me',studentMiddelware.studentAuth)

router.get('/:id',studentController.getStudent);

router.get('/',studentController.getStudents);

router.post('/',studentMiddelware.insertStudent,studentController.insertStudent);

router.put('/:id',studentMiddelware.updateStudent,studentController.updateStudent);

router.delete('/:id',studentController.deleteStudent);



router.post('/signin',studentController.Signin);


module.exports = router;