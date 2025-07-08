// routes/auth.js
import express from 'express';
import { register, login, registerPoster } from '../controllers/auth.js';
import { forgotPassword, verifyResetCode } from '../controllers/forgotPassword.js';

const router = express.Router();

router.post('/register', register);
router.post('/registerPoster', registerPoster);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyResetCode);

export default router;
