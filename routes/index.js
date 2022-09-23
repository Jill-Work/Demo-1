// const { request } = require('express');
const express = require('express');
const router = express.Router();

//      require files
const students = require('./student');
const mentors = require('./mentor');



router.get('/',function(req, res){
    res.send("it's home page of /api options 'users' , 'booking' ");
});


router.use('/student',students);

router.use('/mentor',mentors);

module.exports = router;
