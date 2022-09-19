//      require file

const express = require('express');
const router = express.Router();

const test = require('../controller/testcontroller');



router.get('/',test);