import express from "express";
import userRoutes from "./routes/userRoutes.js";  
const app = express(); 
const PORT = 3000; 
 

app.use(express.static('public')); 
app.use(express.urlencoded({ extended : true})); 
app.use(express.json()); 
app.use('/', userRoutes); 


app.listen(PORT, ()=>console.log(`Server active on port : http://localhost:${PORT}`))