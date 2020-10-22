const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
const query=req.body.cityInput;
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&icon=10d&APPID=179a900c7a35d4f30c5c529ac72ea678";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const imgURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const description=weatherData.weather[0].description
            console.log(temp + " "+ description);
    res.write("<h1>The weather description is "+description + "</h1>");
    res.write("<h1>The temperature in"+ query+" is "+temp+" degrees Celcius.</h1>");
res.write("<img src="+imgURL+"></img>");
res.send();
});

    });

    //res.sendFile(__dirname + "/index.html");

});

app.listen(3000,function(){
    console.log("The server has started. ");
}); 