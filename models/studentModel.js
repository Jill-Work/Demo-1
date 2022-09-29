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
        }
    },{
        timestamps:false,

    
    })


    
    // student.methods.generateHash = async function(password) {
    //     return await bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    // };
    
    // student.methods.validPassword = async function(password) {
    //     return await bcrypt.compareSync(password, this.local.password);
    // };

    return student;
};


// student.pre("insert", async function()
//     {
//         this.password = await bcrypt.hash(this.password,10);
//         console.log("pass  ==>>   "+this.password)
//     })


// const updateStudent = {

//     student_first_name:req.body.student_first_name,
//     student_last_name:req.body.student_last_name,
//     phone:req.body.phone,
//     email:req.body.email,
//     city:req.body.city,
//     state:req.body.state
// }
// module.exports=updateStudent;