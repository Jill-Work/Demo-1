 // define model

 module.exports = (sequelize , DataTypes)=>{
    const student = sequelize.define('students', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_fast_name:{
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
        // mentor_ID:{
        //     type:DataTypes.INTEGER
        // }
    },{
        timestamps:false,
    })

    return student;
};