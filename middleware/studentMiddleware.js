const { name } = require('ejs');
const express = require('express');
const Joi = require('joi');
const app = express();
var jwt = require('jsonwebtoken');


exports.studentAuth = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const tokenId = authorization && authorization.split(' ')[1];

  if (authorization == null) return res.send("null value");

  //pass email to get mentor details also with route change
  
  jwt.verify(tokenId, SECRET_KEY, (err, user) => {
    if (err) {
      res.send("error is  " + err)
    } else {
      req.user = user;
      const params = req.params.id
      if (user.email.id == params ) {
        console.log("done auth")
        next();
      }else {
        res.send({
          message : "NOT FOUND"
        });
      }
    }
  })
};

exports.insertStudent = (req, res, next) => {
  const validation = Joi.object({
    password:Joi.string().required(),
    conpassword:Joi.string().required(),
    student_first_name:Joi.string().required(),
    student_last_name:Joi.string().min(3).max(20).required(),
    phone:Joi.string().required(),
    email:Joi.string().required(),
    city:Joi.string().required(),
    state:Joi.string().required(),
    mentor_id:Joi.optional(),
  }).unknown(false);//.unknown(true)
  const { error } = validation.validate(req.body,{abortEarly:false});
  if (error) {
      return res.status(400).json(
          {
              "error": error.message
          }
      )
  } else {
      next();
  }
};

exports.updateStudent = (req, res, next) => {
  const validation = Joi.object({

      password:Joi.string().optional(),
      conpassword:Joi.string().optional(),
      student_first_name:Joi.string().optional(),
      student_last_name:Joi.string().min(3).max(20).optional(),
      phone:Joi.string().optional(),
      email:Joi.string().optional(),
      city:Joi.string().optional(),
      state:Joi.string().optional(),

  }).unknown(false);//.unknown(true)
  const { error } = validation.validate(req.body,{abortEarly:false});
  if (error) {
      return res.status(400).json(
          {
              "error": error.message
          }
      )
  } else {
      next();
  }
};