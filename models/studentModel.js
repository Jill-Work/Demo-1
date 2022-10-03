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
            type:DataTypes.STRING(100)
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
        },
        
    },{
        timestamps:false,
    })
    return student;
};


