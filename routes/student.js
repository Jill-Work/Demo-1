const express = require('express');
const router = express.Router();


const studentController = require('../controller/studentController');


router.get('/:id',studentController.getStudent);

router.get('/',studentController.getStudents);

router.post('/',studentController.insertStudent);

router.put('/:id',studentController.updateStudent);

router.delete('/:id',studentController.deleteStudent);

module.exports = router;