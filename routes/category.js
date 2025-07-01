import express from 'express';
import { 
    createCategory, 
    updateCategoryId, 
    getCategoryId, 
    getCategoryAll, 
    deleteCategoryId, 
    deleteCategoryAll, 
    countCategory 
} from '../controllers/category.js';

const category = express.Router();

category.post('/', createCategory);
category.put('/:id', updateCategoryId);
category.get('/:id', getCategoryId);
category.get('/', getCategoryAll);
category.delete('/:id', deleteCategoryId);
category.delete('/', deleteCategoryAll);
category.get('/count', countCategory);

export default category;
