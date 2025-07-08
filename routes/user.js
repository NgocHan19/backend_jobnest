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

const router = express.Router();  // ✅ Dùng 1 router duy nhất

// --------- AUTH ROUTES ----------
router.post('/register', register);
router.post('/registerPoster', registerPoster);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyResetCode);

// --------- USER ROUTES ----------
router.get('/count', countUsers);
router.get('/', getUserAll);
router.post('/add/', addUser);
router.put('/', updateUserAll);
router.delete('/', deleteUserAll);

router.get('/:id', getUserId);
router.put('/:id', updateUserId);
router.delete('/:id', deleteUserId);

export default router;  // ✅ Export đúng router
