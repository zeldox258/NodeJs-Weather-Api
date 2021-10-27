const express = require("express");

const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);

  const cityName = req.body.cityName;
  const appid = "e9e62bfba98b8362bc38fccee4e6d625";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+unit+"&appid="+appid;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>"+weatherData.name + "<h1/>")
      res.write("<h2>The weather is "+weatherData.weather[0].description+"<h2/>");
      res.write("<h2>"+temp+" C degree <h2/>");
      res.write("<img src = "+iconurl+">")
      res.send();
      //console.log(weatherData);
    });

  });
});


/*
{
  const cityName = "Istanbul";
  const appid = "?fill with your id?";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+unit+"&appid="+appid;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>"+weatherData.name + "<h1/>")
      res.write("<h2>The weather is "+weatherData.weather[0].description+"<h2/>");
      res.write("<h2>"+temp+" C degree <h2/>");
      res.write("<img src = "+iconurl+">")
      res.send();
      //console.log(weatherData);
    });

  });
}
*/
app.listen(3000,function(){
  console.log("Server is running at port 3000");
});
