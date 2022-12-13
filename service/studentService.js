const model = require('../models/db')

// get student
exports.getStudent = async (id) => {
    return await model.student.findOne({
        where : {id},
        include: [
        {
            model: model.mentor
        }]
    });
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
        where : {email}

    });
};

// log in student
// exports.getStudent = async (email) => {
//     return await model.student.findOne({
        
//         where : {email:email},
//         include: [
//             {
//                 model: model.mentor
//             }
//         ]
//     })
// };

exports.switch = async (data) => {
    const city = data.city ;
    console.log("city ==>> "+city);
    // switch (city) {
    //     case "Ahmedabad":
    //         console.log("Ahmedabad");
    //         break;
    //     case "Mumbai":
    //         console.log("Mumbai");
    //         break;
    //     default:
    //         console.log("India");
    //         break;
    // }
    switch (city) {
        case "student":
        console.log("service data  ==>>  "+data);
        console.log("running in service")
        return await model.student.create(data);
        break;

        case "mentor":
            console.log("service data  ==>>  "+JSON.stringify(data));
            return await model.mentor.create(data);
        break;

    default:
        break;
}

};