
exports.getUser = (req, res) => {
    if (Object.keys(users).length === 0) return res.send({valueExist : false}); 
    res.send({
       valueExist : true,
        userList : users
    })
}

exports.postUser = (req, res) => {
    const keys = Object.keys(users);
    const key = Math.max(...keys.map(Number), 0) + 1;
 
    const value = req.body; 
    users[key] = value;

    res.redirect('/'); 
}

exports.patchUser = (req, res) => {
    const index = req.params.id; 
    const toUpdate = req.body; 
    
    if(!users[index]) return res.status(404).send({message : "User not found"}); 
    
    users[index] = {...users[index], ...toUpdate}; 

    res.send({
       message : "Updated Successfully"
    })
}

exports.putUser = (req, res) => {
    const index = req.params.id; 
    const toUpdate = req.body; 

    if(!users[index]) return res.status(404).send({message : "User not found"});

    users[index] = toUpdate; 
    res.send({
        message : "Changed successfully"
    })
}

exports.deleteUser = (req, res) => {
    const index = req.params.id; 

    if(!users[index]) return res.status(404).send({message : "User not found"});

    delete users[index];  
    res.send({
        indexNumber : index,
        message : "deleted Successfully"
    })
}