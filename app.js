const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config();

//Middleware

const authorize = require("./middleware/authorization");

//Routes

const auth_routes = require("./routes/auth_routes");

//Config
app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET","POST","PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

require("./handlers/mongoDbConnect")();

//Used middleware

app.use(authorize);

//Used Routes

app.use("/auth", auth_routes);


//Server Start
app.listen(process.env.PORT, ()=>{
    console.log("Succesfully started the API!!");
})