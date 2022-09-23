//      require 

const express = require('express');
const env = require('./.env')
const router = require('./routes')
const model = require('./models/db')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);


//      for multi entry in table


app.post('/test', async (req, res) => {
    const name ={
        "student_id":"1",
        "mentor_id":"2"
    }
     await model.student_mentor.create(name);     



        // let a = 1;
//     for (i = a; i < 21; i++) {
//         const name = {
//             "mentor_fast_name": `mentor ${a}`,
//             "mentor_last_name": `mentor ${a}`,
//             "phone": `9876543${a}`,
//             "email": `mentor${a}@gmail.com`,
//             "city": "rajkot",
//             "state": "gujarat"

//             // "student_fast_name": `student ${a}`,
//             // "student_last_name": `student ${a}`,
//             // "phone": `9876543${a}`,
//             // "email": `student${a}@gmail.com`,
//             // "city": "rajkot",
//             // "state": "gujarat"
//         };
//         await model.mentor.create(name);
//         a++;
//     }
});



app.listen(PORT, () => {
    console.log('port started on port => 5000')
});