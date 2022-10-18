const studentService = require('../service/studentService')
const { mentor } = require('../models/db');
const student_mentors = require('../models/student_mentor');
const { Model } = require('sequelize');
const insertMentor = require('../service/student_mentors');
const model = require('../models/db');
const studentUpdate = require('../models/studentModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const env = require("../.env")
const middleware= require("../middleware/studentMiddleware")





//      get student
exports.getStudent = async (req, res) => {
    // const id = req.user.email.id;
    const id = req.params.id;
    console.log("id is ==>>  "+id);
    const user = await studentService.getStudent(id);
    res.send(user);
    console.log("get student  in student controller ==>>   " + JSON.stringify(user))
};

//      get studentS
exports.getStudents = async (req, res) => {

    let condition = {};

    if (req.query.search) {
        condition = {
            where: {
                id: req.query.search
            }
        }
    } else {
        condition = {
            ...condition,           //      append  code after old code
            limit: parseInt(req.query.size),      //  parseInt is use to convert string into integer value
            offset: parseInt(req.query.size) * parseInt((req.query.page - 1)),
        }
    }


    const user = await studentService.getStudents(condition)
    res.send(user);
    console.log("get students in student controller    ==>> "+JSON.stringify(user));
};

//      insert student
exports.insertStudent = async (req, res) => {
    const add = req.body;
    var password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    if (add.password === add.conpassword) {
        add.password = password;

        const user = await studentService.insertStudent(add);

        //student_mentors table insert
        for (i = 0; i < add.mentor_id.length; i++) {
            let studentMentor = {
                "student_id": user.id,
                "mentor_id": add.mentor_id[i]
            };
            await model.student_mentor.create(studentMentor);
        };
        res.send(user);
        console.log("create student is in student controller  ==>>  "+JSON.stringify(user));
    } else {
        res.send("invalid confirm password");
        console.log("invalid confirm password in student controller");
    }
};

//      update student
exports.updateStudent = async (req, res) => {
    const id = req.params.id;
    var password = req.body.password;
    if (password === req.body.conpassword) {
        
    
    const salt = await bcrypt.genSalt(10);
    const updatePassword = await bcrypt.hash(password, salt);

    const update = {
        password:updatePassword,
        conpassword:req.body.conpassword,
        student_first_name: req.body.student_first_name,
        student_last_name: req.body.student_last_name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state
    }
    const user = await studentService.updateStudent(id, update);
    res.send(user);
    console.log("update student in student controller  ==>>  " + JSON.stringify(user));
    }else{
        res.send("pass not match")
    }
};

//      delete student
exports.deleteStudent = async (req, res) => {
    const id = req.params.id;
    const user = await studentService.deleteStudent(id);
    res.send("deleted is was = " + id);
    console.log("deleted student id is in student controller  ==>>  " + id);
};

//      authorization
exports.auth = async (req, res) => {
    console.log("Req email", req.user.email.id);
    const id = req.user.email.id;
    console.log(id)
    const user = await studentService.getStudent(id);
    res.send(user);
    console.log("authorize in student controller  ==>>  "+ JSON.stringify(user));

}




//      log in student
exports.Signin = async (req, res) => {
    const pass = req.body.password;
    const email = req.body.email;
    const user = await studentService.studentSignin(email);
    const dbpass = user.password;
    bcrypt.compare(pass, dbpass, (err, data) => {
        if (err) throw err

        if (data) {
            const token = jwt.sign({ "email": user }, SECRET_KEY);
            console.log("token   ==>.  " + token);
            res.status(200).json({ token : token });
            // res.send(user);
            console.log("log in in student controller  ==>>  "+JSON.stringify(user));

        } else {
            res.send("invalid details");
            console.log("invalid details in student controller");

    }
})}



// exports.insertStudent = async (req, res) => {

//     const add = req.body;
//     var password = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     password = await bcrypt.hash(password, salt);

//     if (add.password === add.conpassword) {
//         add.password = password;

//         const user = await studentService.switch(add);
//         console.log("user ==>" + user);
//         student_mentors table insert
//         for (i = 0; i < add.mentor_id.length; i++) {
//             let studentMentor = {
//                 "student_id": user.id,
//                 "mentor_id": add.mentor_id[i]
//             };
//             await model.student_mentor.create(studentMentor);
//         };
//         res.send(user);
//         console.log("create student is in student controller  ==>>  "+JSON.stringify(user));
//     } else {
//         res.send("invalid confirm password");
//         console.log("invalid confirm password in student controller");
//     }
// };

