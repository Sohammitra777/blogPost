import express from "express"; 
import {getUser, postUser, patchUser, putUser, deleteUser} from "../controller/userController.js";
const router = express.Router(); 

router.get('/users', getUser); 
router.post('/submit', postUser); 
router.patch('/users/:id', patchUser); 
router.put('/users/:id', putUser); 
router.delete('/users/:id', deleteUser); 

export default router; 