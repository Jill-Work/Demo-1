 // require module
 const express = require('express');
 const app = express();
 

 // define model

 module.exports = (sequelize , DataTypes)=>{
    const student = sequelize.define('students', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        password:{
            type:DataTypes.STRING(50)
        },
        student_first_name:{
            type:DataTypes.STRING(50)
        },
        student_last_name:{
            type:DataTypes.STRING(50)
        },
        phone:{
            type:DataTypes.INTEGER
        },
        email:{
            type:DataTypes.STRING(50)
        },
        city:{  
            type:DataTypes.STRING(50)
        },
        state:{
            type:DataTypes.STRING(50)
        }
    },{
        timestamps:false,
    })

    return student;
};



// const updateStudent = {

//     student_first_name:req.body.student_first_name,
//     student_last_name:req.body.student_last_name,
//     phone:req.body.phone,
//     email:req.body.email,
//     city:req.body.city,
//     state:req.body.state
// }
// module.exports=updateStudent;