const studentService = require('../service/studentService')
const { mentor } = require('../models/db');
const student_mentors = require('../models/student_mentor');
const { Model } = require('sequelize');
const insertMentor = require('../service/student_mentors');
const model = require('../models/db');



//      get student
exports.getStudent = async(req,res) => {
    const id = req.params.id;
    const user = await studentService.getStudent(id);
    res.send(user);
    console.log("get student     "+id)
};

//      get studentS
exports.getStudents = async(req,res) => {

    let condition = {};

    if(req.query.search){
        condition = {
            where: {
                 id:req.query.search   
            }
        }
    }   else    {
        condition = {
            ...condition,           //      append  code after old code
            limit: parseInt(req.query.size),      //  parseInt is use to convert string into integer value
            offset: parseInt(req.query.size) * parseInt((req.query.page - 1)),
        }
    }


    const user = await studentService.getStudents(condition)
    res.send(user);
    console.log("get students");
};

//      insert student
exports.insertStudent = async(req,res) => {
    const add = req.body;
    const user = await studentService.insertStudent(add);
    
    //student_mentors table insert
    for(i=0; i<add.mentor_id.length; i++){
        console.log('data is   is  '+add.mentor_id[i])
        let studentMentor = {
            "student_id": user.id,
            "mentor_id": add.mentor_id[i]
        };
        await model.student_mentor.create(studentMentor) ;
        }

    
    res.send(user);
    console.log("insert student    "+user);
};

//      update student
exports.updateStudent = async(req,res) => {
    const id = req.params.id;
    const update = {
        student_fast_name:req.body.student_fast_name,
        student_last_name:req.body.student_last_name,
        phone:req.body.phone,
        email:req.body.email,
        city:req.body.city,
        state:req.body.state
    }
    const user = await studentService.updateStudent(id,update);
    res.send(user);
    console.log("update student    "+user);
};

//      delete student
exports.deleteStudent = async(req,res) => {
    const id = req.params.id;
    const user = await studentService.deleteStudent(id);
    res.send(user);
    console.log("deleted student id is  "+id);
};