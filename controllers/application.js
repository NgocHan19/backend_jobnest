import Application from '../models/application.js';

export const createApplication = async (req, res, next) => {
    try {
        const newApplication = new Application({
            ...req.body,
            cv: req.file ? req.file.path : undefined 
        });

        const savedApplication = await newApplication.save();
        res.status(200).json(savedApplication);
    } catch (err) {
        next(err);
    }
};

export const updateApplicationId = async (req, res, next) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedApplication);
    } catch (err) {
        next(err);
    }
};

export const updateApplicationAll = async (req, res, next) => {
    try {
        const updatedApplications = await Application.updateMany(
            req.body.filter, 
            { $set: req.body.update } 
        );
        res.status(200).json(updatedApplications);
    } catch (err) {
        next(err);
    }
};

export const getApplicationId = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);
        res.status(200).json(application);
    } catch (err) {
        next(err);
    }
};

export const getApplicationIdAll = async (req, res, next) => {
    try {
        const applications = await Application.find(req.query); 
        res.status(200).json(applications);
    } catch (err) {
        next(err);
    }
};

export const deleteApplicationId = async (req, res, next) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Application deleted successfully." });
    } catch (err) {
        next(err);
    }
};

export const deleteApplicationAll = async (req, res, next) => {
    try {
        const deletedApplications = await Application.deleteMany(req.body.filter); 
        res.status(200).json(deletedApplications);
    } catch (err) {
        next(err);
    }
};

export const countApplication = async (req, res, next) => {
    try {
        const applicationCount = await Application.countDocuments(req.query); 
        res.status(200).json({ count: applicationCount });
    } catch (err) {
        next(err);
    }
};
export const getApplicationsByJobId = async (req, res, next) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .populate('user')   
            .populate('profile'); 

        res.status(200).json(applications);
    } catch (err) {
        next(err);
    }
};
