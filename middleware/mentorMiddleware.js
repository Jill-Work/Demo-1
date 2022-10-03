const { name } = require('ejs');
const express = require('express');
const Joi = require('joi');
const app = express();
var jwt = require('jsonwebtoken');


exports.mentorAuth = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const tokenId = authorization && authorization.split(' ')[1];

  if (authorization == null) return res.send("null value");

  jwt.verify(tokenId, SECRET_KEY, (err, email) => {
    if (err) {
      res.send("error is  " + err)
    } else {
      req.email = email;
      next();
    }
  })
};

exports.insertMentor = (req, res, next) => {
  const validation = Joi.object({
    password:Joi.string().require(),
    mentor_first_name:Joi.string().required(),
    mentor_last_name:Joi.string().min(3).max(20).required(),
    phone:Joi.string().required(),
    email:Joi.string().required(),
    city:Joi.string().required(),
    state:Joi.string().required(),

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

exports.updateMentor = (req, res, next) => {
    const validation = Joi.object({

        password:Joi.string().optional(),
        mentor_first_name:Joi.string().optional(),
        mentor_last_name:Joi.string().min(3).max(20).optional(),
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