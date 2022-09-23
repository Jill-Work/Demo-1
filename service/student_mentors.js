const model = require('../models/db');


exports.insertMentor = async (data) => {
    console.log("data is   "+data)
    return await model.student_mentor.mentor.create(data);
};
