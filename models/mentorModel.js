 // define model

 module.exports = (sequelize , DataTypes)=>{
    const mentor = sequelize.define('mentors',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        password:{
            type:DataTypes.STRING(50)
        },
        mentor_first_name:{
            type:DataTypes.STRING(50)
        },
        mentor_last_name:{
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

    return mentor;
};