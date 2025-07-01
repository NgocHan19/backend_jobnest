import express from 'express';
import {     
    addUser,
    getUserId, 
    updateUserId, 
    updateUserAll, 
    getUserAll, 
    deleteUserId, 
    deleteUserAll, 
    countUsers  } from '../controllers/user.js';
import { register,login,registerPoster } from '../controllers/auth.js';
import { forgotPassword, verifyResetCode } from '../controllers/forgotPassword.js';
const user=express.Router();
user.get('/count', countUsers); 
user.get('/:id',getUserId);
user.post('/register',register);
user.post('/registerPoster',registerPoster);
user.post('/login',login);
user.put('/:id', updateUserId); 
user.put('/', updateUserAll); 
user.get('/', getUserAll); 
user.post('/add/', addUser); 
user.delete('/:id', deleteUserId); 
user.delete('/', deleteUserAll);
user.post("/forgotPassword", forgotPassword);
user.post('/verifyResetCode', verifyResetCode);
export default user;