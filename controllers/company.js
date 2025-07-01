import Company from '../models/company.js';

export const createCompany = async (req, res, next) => {
    const newCompany = new Company(req.body);
    try {
        const savedCompany = await newCompany.save();
        res.status(200).json(savedCompany);
    } catch (err) {
        next(err);
    }
};

export const updateCompanyId = async (req, res, next) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCompany);
    } catch (err) {
        next(err);
    }
};

export const updateCompanyAll = async (req, res, next) => {
    try {
        const updatedCompanies = await Company.updateMany(
            req.body.filter, 
            { $set: req.body.update } 
        );
        res.status(200).json(updatedCompanies);
    } catch (err) {
        next(err);
    }
};

export const getCompanyId = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        res.status(200).json(company);
    } catch (err) {
        next(err);
    }
};

export const getCompanyAll = async (req, res, next) => {
    try {
        const companies = await Company.find(req.query); 
        res.status(200).json(companies);
    } catch (err) {
        next(err);
    }
};

export const deleteCompanyId = async (req, res, next) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Company deleted successfully." });
    } catch (err) {
        next(err);
    }
};

export const deleteCompanyAll = async (req, res, next) => {
    try {
        const deletedCompanies = await Company.deleteMany(req.body.filter); 
        res.status(200).json(deletedCompanies);
    } catch (err) {
        next(err);
    }
};

export const countCompany = async (req, res, next) => {
    try {
        const companyCount = await Company.countDocuments(req.query); 
        res.status(200).json({ count: companyCount });
    } catch (err) {
        next(err);
    }
};
export const getCompanyManagedBy = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const companies = await Company.find({ managedBy: userId })
            .populate('managedBy', 'name email')
            .populate('employees', 'name email'); 

        if (!companies || companies.length === 0) {
            return res.status(404).json({ message: 'No companies found for this user.' });
        }

        res.status(200).json(companies);
    } catch (err) {
        next(err);
    }
};
