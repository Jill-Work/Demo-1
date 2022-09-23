 // define model

 module.exports = (sequelize , DataTypes)=>{
    const student_mentor = sequelize.define('student_mentors',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_id:{
            type:DataTypes.INTEGER
        },
        mentor_id:{
            type:DataTypes.INTEGER
        }
    },{
        timestamps: false,
    })

    return student_mentor;
};