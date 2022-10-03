const MentorService = require('../service/mentorService');
const { mentor } = require('../models/db');
const student_mentors = require('../models/student_mentor');
const { Model } = require('sequelize');
const insertMentor = require('../service/student_mentors');
const model = require('../models/db');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


//      get Mentor
exports.getMentor = async(req,res) => {
    const id = req.params.id;
    const user = await MentorService.getMentor(id);
    res.send(user);
    console.log("get Mentor in mentor controller ==>>   "+JSON.stringify(user))
};

//      get MentorS
exports.getMentors = async(req,res) => {
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
    const user = await MentorService.getMentors(condition)
    res.send(user);
    console.log("get Mentors in mentor controller ==>>   "+JSON.stringify(user));
};

//      insert Mentor
exports.insertMentor = async(req,res) => {
    const add = req.body;
    var password = req.body.password;
    console.log(password)
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    if (add.password === add.conpassword) 
    {
        add.password = password;
        const user = await MentorService.insertMentor(add);

        //student_mentors table insert 
        for(i=0; i<add.student_id.length; i++)
        {
            let studentMentor = {
                    "student_id": add.student_id[i],
                    "mentor_id": user.id
                };
            await model.student_mentor.create(studentMentor) ;
        }

    res.send(user);
    console.log("create Mentor in mentor controller ==>>   "+JSON.stringify(user));

    } else {
        res.send("invalid credential");
        console.log("invalid credential in mentor controller");
    }

}

//      update Mentor
exports.updateMentor = async(req,res) => {
    const id = req.params.id;
    const update = {
        mentor_first_name:req.body.mentor_first_name,
        mentor_last_name:req.body.mentor_last_name,
        phone:req.body.phone,
        email:req.body.email,
        city:req.body.city,
        state:req.body.state
    }
    const user = await MentorService.updateMentor(id,update);
    res.send(user);
    console.log("update Mentor in mentor controller ==>>    "+JSON.stringify(user));
};

//      delete Mentor
exports.deleteMentor = async(req,res) => {
    const id = req.params.id;
    const user = await MentorService.deleteMentor(id);
    res.send(user);
    console.log("deleted Mentor id is  in mentor controller ==>>   "+id);
};

//      authorization
exports.auth = async (req, res) => {
    const email = req.email.email;
    const user = await studentService.getMentor(email);
    res.send(user);
    console.log("authorize in mentor controller  ==>>  "+ JSON.stringify(user));

}

//      log in
exports.Signin = async (req,res) => {
    
    console.log(req.body);
    const pass = req.body.password;
    const email = req.body.email;
    const user = await MentorService.mentorSignin(email);
    const dbpass = user.password;

    bcrypt.compare(pass, dbpass, (err, data) => {
        if (err) throw err

        if (data) {
            const token = jwt.sign({ "email": email }, "abcd");
            console.log("token   ==>.  " + token);
            res.status(200).json({ token : token });
            res.send(user);
            console.log("log in in mentor controller  ==>>  "+JSON.stringify(user));

        } else {
            res.send("invalid details");
            console.log("invalid details in mentor controller");

        }
    })  
};