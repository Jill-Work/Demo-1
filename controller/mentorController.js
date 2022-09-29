const MentorService = require('../service/mentorService');
const { mentor } = require('../models/db');
const student_mentors = require('../models/student_mentor');
const { Model } = require('sequelize');
const insertMentor = require('../service/student_mentors');
const model = require('../models/db');



//      get Mentor
exports.getMentor = async(req,res) => {
    const id = req.params.id;
    const user = await MentorService.getMentor(id);
    res.send(user);
    console.log("get Mentor     "+id)
};

//      get MentorS
exports.getMentors = async(req,res) => {
    let condition = {};

    if(req.query.search){
        condition = {
            where: {
                 mentor_first_name:req.query.search   
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
    console.log("get Mentors");
};

//      insert Mentor
exports.insertMentor = async(req,res) => {
    const add = req.body;

    if (add.password === add.conpassword) 
    {
        const user = await MentorService.insertMentor(add);

        //student_mentors table insert 
        for(i=0; i<add.student_id.length; i++)
        {
            console.log('data is   is  '+add.student_id[i])
            let studentMentor = {
                    "student_id": add.student_id[i],
                    "mentor_id": user.id
                };
            await model.student_mentor.create(studentMentor) ;
        }

    res.send(user);
    console.log("insert Mentor    "+user);

    } else {
        res.send("invalid credential");
        console.log("invalid credential");
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
    console.log("update Mentor    "+user);
};

//      delete Mentor
exports.deleteMentor = async(req,res) => {
    const id = req.params.id;
    const user = await MentorService.deleteMentor(id);
    res.send(user);
    console.log("deleted Mentor id is  "+id);
};

//      sign in
exports.Signin = async (req,res) => {
    
    console.log(req.body);
    const pass = req.body.password;
    const email = req.body.email;
    const user = await MentorService.mentorSignin(email);
    console.log("user is  ===>>"+user)

    if (user.password === pass) {
        res.send(user);
    }else{
        res.send("invalid details");
    }
    
}