const { where } = require('sequelize');
const model = require('../models/db')

// get Mentor
exports.getMentor = async (id) => {
    return await model.mentor.findOne({
        where:{ id },
        include: [
        {
            model: model.student
        }
    ]
});
};

// get Mentors
exports.getMentors = async (condition) => {
    return await model.mentor.findAll(
        {
            ...condition,
            include: [
                {
                    model: model.student
                }
            ]
        });
};

// insert Mentor
exports.insertMentor = async (data) => {
    return await model.mentor.create(data);
};

// update Mentor
exports.updateMentor = async (id, update) => {
    return await model.mentor.update(update, { where: { id: id } });
};

// delete Mentor
exports.deleteMentor = async (data) => {
    return await model.mentor.destroy({});
};

//  sign in
exports.mentorSignin = async (email) => {
    return await model.mentor.findOne({
        where : {email:email},

    });
};