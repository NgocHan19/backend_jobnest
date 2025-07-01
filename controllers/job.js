import Job from '../models/job.js';
import Company from '../models/company.js';
export const createJob = async (req, res, next) => {
    const newJob = new Job(req.body);
    try {
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    } catch (err) {
        next(err);
    }
};

export const updateJobId = async (req, res, next) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedJob);
    } catch (err) {
        next(err);
    }
};

export const updateJobAll = async (req, res, next) => {
    try {
        const updatedJobs = await Job.updateMany(
            req.body.filter, 
            { $set: req.body.update }
        );
        res.status(200).json(updatedJobs);
    } catch (err) {
        next(err);
    }
};

export const getJobId = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json(job);
    } catch (err) {
        next(err);
    }
};

export const getJobAll = async (req, res, next) => {
    try {
        const jobs = await Job.find(req.query)
        .populate('company benefits category'); 
        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
};

export const deleteJobId = async (req, res, next) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Job deleted successfully." });
    } catch (err) {
        next(err);
    }
};

export const deleteJobAll = async (req, res, next) => {
    try {
        const deletedJobs = await Job.deleteMany(req.body.filter); 
        res.status(200).json(deletedJobs);
    } catch (err) {
        next(err);
    }
};

export const countJobs = async (req, res, next) => {
    try {
        const jobCount = await Job.countDocuments(req.query); 
        res.status(200).json({ count: jobCount });
    } catch (err) {
        next(err);
    }
};
export const getJobsByCategoryId = async (req, res, next) => {
    try {
        const jobs = await Job.find({ category: req.params.categoryId })
            .populate('company benefits category'); 

        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
};
export const countJobsByCompany = async (req, res, next) => {
    try {
        const jobCounts = await Job.aggregate([
            {
                $group: {
                    _id: "$company", 
                    jobCount: { $sum: 1 }, 
                }
            },
            {
                $lookup: {
                    from: "companies", 
                    localField: "_id", 
                    foreignField: "_id", 
                    as: "companyDetails",
                }
            },
            {
                $unwind: "$companyDetails", 
            },
            {
                $project: {
                    _id: 1,
                    jobCount: 1,
                    "companyDetails.nameCompany": 1,
                    "companyDetails.logo": 1, 
                    "companyDetails.location": 1, 
                }
            }
        ]);
        res.status(200).json(jobCounts);
    } catch (err) {
        next(err);
    }
};
export const countJobsByCompanyId = async (req, res, next) => {
    try {
        const { companyId } = req.params;

        const jobCount = await Job.countDocuments({ company: companyId }); 

        res.status(200).json({
            companyId,
            jobCount,
        });
    } catch (err) {
        next(err);
    }
};
export const getJobsByCompanyId = async (req, res, next) => {
    try {
        const jobs = await Job.find({ company: req.params.companyId })
            .populate('company benefits category'); 

        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
};
export const getJobsByUserId = async (req, res, next) => {
    try {
        const jobs = await Job.find({ postedBy: req.params.userId })
            .populate('company benefits category');

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy công việc nào cho người dùng này.' });
        }

        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
};

