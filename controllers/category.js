import Category from '../models/category.js';

export const createCategory = async (req, res, next) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        next(err);
    }
};

export const updateCategoryId = async (req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCategory);
    } catch (err) {
        next(err);
    }
};

export const getCategoryId = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
};

export const getCategoryAll = async (req, res, next) => {
    try {
        const categories = await Category.find(req.query); 
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
};

export const deleteCategoryId = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted successfully." });
    } catch (err) {
        next(err);
    }
};

export const deleteCategoryAll = async (req, res, next) => {
    try {
        const deletedCategories = await Category.deleteMany(req.body.filter); 
        res.status(200).json(deletedCategories);
    } catch (err) {
        next(err);
    }
};
export const countCategory = async (req, res, next) => {
    try {
        const categoryCount = await Category.countDocuments(req.query); 
        res.status(200).json({ count: categoryCount });
    } catch (err) {
        next(err);
    }
};
