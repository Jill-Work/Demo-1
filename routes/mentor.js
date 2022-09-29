const express = require('express');
const router = express.Router();


const mentorController = require('../controller/mentorController');


router.get('/:id',mentorController.getMentor);

router.get('/',mentorController.getMentors);

router.post('/',mentorController.insertMentor);

router.put('/:id',mentorController.updateMentor);

router.delete('/:id',mentorController.deleteMentor);


router.post('/signin',mentorController.Signin);


module.exports = router;