import express from "express"; 
const app = express(); 
const PORT = 3000; 
const users = {}; 

app.use(express.static('public')); 
app.use(express.urlencoded({ extended : true})); 
app.use(express.json()); 

app.get('/users', (req, res)=>{

    if (Object.keys(users).length === 0) return res.send({valueExist : false}); 
    res.send({
       valueExist : true,
        userList : users
    })
})

app.post('/submit', (req, res)=>{
    const keys = Object.keys(users);
    const key = Math.max(...keys.map(Number), 0) + 1;
 
    const value = req.body; 
    users[key] = value;

    res.redirect('/'); 
})

app.patch('/users/:id', (req, res)=>{ 
    const index = req.params.id; 
    const toUpdate = req.body; 
    
    if(!users[index]) return res.status(404).send({message : "User not found"}); 
    
    users[index] = {...users[index], ...toUpdate}; 

    res.send({
       message : "Updated Successfully"
    })
})

app.put('/users/:id', (req, res)=>{
    const index = req.params.id; 
    const toUpdate = req.body; 

    if(!users[index]) return res.status(404).send({message : "User not found"});

    users[index] = toUpdate; 
    res.send({
        message : "Changed successfully"
    })
})

app.delete('/users/:id', (req, res)=>{
    const index = req.params.id; 

    if(!users[index]) return res.status(404).send({message : "User not found"});

    delete users[index];  
    res.send({
        indexNumber : index,
        message : "deleted Successfully"
    })
})


app.listen(PORT, ()=>console.log(`Server active on port : http://localhost:${PORT}`))