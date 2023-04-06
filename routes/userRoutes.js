const { signup, login } = require("../controllers/userController");

const jwt = require("jsonwebtoken");
const Article = require("../models/articleModel");
const {setArticles, getArticles, deleteArticles, updateArticles} = require("../controllers/ArticleController");

const userRoutes = require("express").Router();


//user routes
userRoutes.post("/signup" , signup)
userRoutes.post("/login" , login)

//middleware to decode user token
let DecodeUser = (req , res , next)=>{
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token , process.env.SECRET_KEY , (err , decoded)=>{
        if(!err){
            req.decoded = decoded;
            next();
        }else{
            res.status(403).json({token:token, message:"Not Authorized"})
        }
    }
    )
}

//middleware to check if user is an admin
let CheckIfAdmin = (req , res , next)=>{
    if(req.decoded.role == "admin"){
        next();
    }else{
        res.status(403).json({"Message":"Not Authorized as administrator"})
    }
}

//user route to view secret page
userRoutes.get("/" , DecodeUser , (req , res)=>{
    res.status(200).json({"Message":"Normal user route"})
})

//user route to view secret page admin
userRoutes.get("/admin" , DecodeUser , CheckIfAdmin , (req , res)=>{
    res.status(200).json({"Message":"Admin user route"})
})  
 
//user route to add new article only by an admin
userRoutes.post("/article" , DecodeUser , CheckIfAdmin , setArticles)

//user route to add article by anyone
userRoutes.post("/articlepublic" , DecodeUser , setArticles)

//user route to get all articles
userRoutes.get("/allarticles" , DecodeUser , getArticles)

//user route to delete an article
userRoutes.delete("/article/:id" , DecodeUser , CheckIfAdmin , deleteArticles)

//user route to update an article
userRoutes.patch("/article/:id" , DecodeUser , CheckIfAdmin , updateArticles)


   


module.exports = userRoutes;