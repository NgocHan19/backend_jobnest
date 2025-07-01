import Profile from '../models/profile.js';

export const createProfile = async (req, res, next) => {
    const newProfile = new Profile(req.body);
    try {
        const savedProfile = await newProfile.save();
        res.status(200).json(savedProfile);
    } catch (err) {
        next(err);
    }
};

export const getProfileByUserId = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId })
        .populate('user'); 
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            { $set: req.body },
            { new: true }
        );
        if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(updatedProfile);
    } catch (err) {
        next(err);
    }
};

export const deleteProfile = async (req, res, next) => {
    try {
        const deletedProfile = await Profile.findOneAndDelete({ user: req.params.userId });
        if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (err) {
        next(err);
    }
};
export const getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find().populate('user');
        res.status(200).json(profiles);
    } catch (err) {
        next(err);
    }
};