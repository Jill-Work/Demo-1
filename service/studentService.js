const model = require('../models/db')

// get student
exports.getStudent = async (id) => {
    return await model.student.findOne({
        where : {id:id},
        include: [
        {
            model: model.mentor
        }
    ]});
};

// get students
exports.getStudents = async (condition) => {
    return await model.student.findAll({
        ...condition,
            include: [
                {
                    model: model.mentor
                }
            ]
    });
};

// insert student
exports.insertStudent = async (data) => {
    return await model.student.create(data);
};

// update student
exports.updateStudent = async (id,update) => {
    return await model.student.update(update,{where:{id:id}});
};

// delete student
exports.deleteStudent = async (id) => {
    return await model.student.destroy({where:{id}});
};

//  sign in
exports.studentSignin = async (email) => {
    return await model.student.findOne({
        where : {email:email}

    });
};

// log in student
exports.getStudent = async (email) => {
    return await model.student.findOne({
        
        where : {email:email},
        include: [
            {
                model: model.mentor
            }
        ]
    })
};