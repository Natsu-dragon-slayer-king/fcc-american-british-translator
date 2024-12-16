const express = require("express");
const app = express();
require("dotenv").config({path:"./config/config.env"});
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"))

app.route("/").get((req,res)=>{
	res.sendFile(__dirname + "/views/index.html");
})

const apiRoutes = require(__dirname + "/routes/routes.js");
apiRoutes(app);

const server = app.listen(process.env["PORT"] || 5000, ()=>{
	console.log(`Your server is connected to port: ${server.address().port}`);
})