import express from 'express';
import {     
    addUser,
    getUserId, 
    updateUserId, 
    updateUserAll, 
    getUserAll, 
    deleteUserId, 
    deleteUserAll, 
    countUsers
} from '../controllers/user.js';

import { register, login, registerPoster } from '../controllers/auth.js';
import { forgotPassword, verifyResetCode } from '../controllers/forgotPassword.js';

const user = express.Router();

user.post('/register', register);
user.post('/registerPoster', registerPoster);
user.post('/login', login);
user.post('/forgotPassword', forgotPassword);
user.post('/verifyResetCode', verifyResetCode);
user.get('/count', countUsers);
user.get('/', getUserAll);
user.post('/add/', addUser);
user.put('/', updateUserAll);
user.delete('/', deleteUserAll);

user.get('/:id', getUserId);
user.put('/:id', updateUserId);
user.delete('/:id', deleteUserId);

export default user;
