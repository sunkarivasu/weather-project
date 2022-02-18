const express = require("express");
const https = require("https");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
    
    
})

app.post("/",function(req,res)
{
    var cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=203e83b222a26681774549723edae383&units=metric"
    https.get(url,function(response)
    {
        if(response.statusCode!=200)
            res.send("<h1>Invalid city name<h1>");
        response.on("data",function(result)
        {
            var weather = JSON.parse(result);
            var icon = weather.weather[0].icon;
            const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
           
            res.write("<h1>Temperature in london is "+weather.main.temp+"degree celcius</h1>");
            res.write("<p>It's "+weather.weather[0].description+"</p>");
            res.write("<img src="+icon_url+"></img>");
            res.send();
        })
        
    })
    
});

app.listen(3000,function()
{
    console.log("server is running on port 3000");
})
