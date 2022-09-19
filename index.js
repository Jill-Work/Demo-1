//      require 

const express = require('express');
const { test } = require('./controller/studentController');
const app = express();

app.use('/',test);

app.listen(5000,()=>{
    console.log('port started on port => 5000')
});