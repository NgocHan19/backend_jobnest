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

const user = express.Router();

user.get('/count', countUsers);
user.get('/', getUserAll);
user.post('/add/', addUser);
user.put('/', updateUserAll);
user.delete('/', deleteUserAll);

user.get('/:id', getUserId);
user.put('/:id', updateUserId);
user.delete('/:id', deleteUserId);

export default user;
