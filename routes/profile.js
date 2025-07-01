import express from 'express';
import { createProfile, getProfileByUserId, updateProfile, deleteProfile, getAllProfiles, } from '../controllers/profile.js';

const router = express.Router();

router.post('/', createProfile);
router.get('/', getAllProfiles); 
router.get('/:userId', getProfileByUserId);
router.put('/:userId', updateProfile);
router.delete('/:userId', deleteProfile);

export default router;
