const path = require("path");
 

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


const staticPath=path.join(__dirname);
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){

    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=c6dbb2e4ff7bea3fe89042272c2ca66d&units=metric";

https.get(url,function(response){

     console.log(response.statusCode);

response.on("data",function(data){

    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    res.send("Temperature of your city is "+ temp);
            
        })
    })
})


app.listen(3000,function(){
    console.log("server started at port 3000");
})



