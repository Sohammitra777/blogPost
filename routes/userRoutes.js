import app from "express"; 
import userController from "../controller/userController";
const router = app.Router; 

router.get('/', userController.getUser); 
router.post('/submit', userController.postUser); 
router.patch('/users/:id', userController.patchUser); 
router.put('/users/:id', userController.putUser); 
router.delete('/users/:id', userController.deleteUser); 

export default module; 