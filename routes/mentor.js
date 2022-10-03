const express = require('express');
const router = express.Router();
const mentorMiddleware = require("../middleware/mentorMiddleware")


const mentorController = require('../controller/mentorController');


router.get('/:id',mentorController.getMentor);

router.get('/',mentorController.getMentors);

router.post('/',mentorMiddleware.insertMentor,mentorController.insertMentor);

router.put('/:id',mentorMiddleware.updateMentor,mentorController.updateMentor);

router.delete('/:id',mentorController.deleteMentor);


router.post('/signin',mentorController.Signin);

router.post('/login',mentorMiddleware.mentorAuth,mentorController.auth)



module.exports = router;