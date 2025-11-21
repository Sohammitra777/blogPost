const users = {};

setInterval(() => {
    users = {}; 
    alert("All data will be removed in 5 minute as this is hobby project, Thank you for you time for checking this out"); 
}, 5*60*1000);

export const getUser = (req, res) => {
    if (Object.keys(users).length === 0) return res.send({valueExist : false}); 
    res.send({
       valueExist : true,
        userList : users
    })
}

export const postUser = (req, res) => {
    const keys = Object.keys(users);
    const key = Math.max(...keys.map(Number), 0) + 1;
 
    const value = req.body; 
    users[key] = value;

    res.redirect('/'); 
}

export const patchUser = (req, res) => {
    const index = req.params.id; 
    const toUpdate = req.body; 
    
    if(!users[index]) return res.status(404).send({message : "User not found"}); 
    
    users[index] = {...users[index], ...toUpdate}; 

    res.send({
       message : "Updated Successfully"
    })
}

export const putUser = (req, res) => {
    const index = req.params.id; 
    const toUpdate = req.body; 

    if(!users[index]) return res.status(404).send({message : "User not found"});

    users[index] = toUpdate; 
    res.send({
        message : "Changed successfully"
    })
}

export const deleteUser = (req, res) => {
    const index = req.params.id; 

    if(!users[index]) return res.status(404).send({message : "User not found"});

    delete users[index];  
    res.send({
        indexNumber : index,
        message : "deleted Successfully"
    })
}