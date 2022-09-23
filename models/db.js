//      sequelize import
const {Sequelize , DataTypes, Model}  = require('sequelize');   
const student_to_mentor = require('./student_mentor');


//      passing database = = db name , username , password , host  , dialect
const sequelize = new Sequelize('management', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});


//      sequelize defining  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//      connecting db to model
db.student = require('./studentModel')(sequelize , DataTypes);
db.mentor = require('./mentorModel')(sequelize , DataTypes);
db.student_mentor = require('./student_mentor')(sequelize,DataTypes);


//      many to many  
db.student.belongsToMany(db.mentor,{foreignKey:"student_id",through:"student_mentors"});
db.mentor.belongsToMany(db.student,{foreignKey:"mentor_id",through:"student_mentors"});


//      sync db
db.sequelize.sync({force:false})
.then(()=>{
    console.log("##     R E _ S Y N C      ##");
})
.catch((error)=>{
    console.log("##     E R R O R        "+error);
});


//      export db
module.exports=db;

