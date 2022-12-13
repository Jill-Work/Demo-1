const express = require('express')
const app = express();
const axios = require('axios');



app.get('/weather', (req,res) => {
  console.log("req headers", req.headers.lat);
  const lat = req.query.lat //req.headers.lat //23.022505;
  const lon = 72.571365;
  const key = "1ace8c841dd80b8886c1aad2a785c6ca";
  
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
  .then(function (response) {
    // handle success
    res.send(response.data)
    console.log(response.data.main);
  })
  .catch(function (error) {
    // handle error
    res.send(error)
    console.log(error);
  });  


// const request = require('request');

// request('https://api.openweathermap.org/data/2.5/weather?lat=23.022505&lon=72.571365&appid=1ace8c841dd80b8886c1aad2a785c6ca', 
// function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


})









app.listen(5000);