import express from 'express';
import { 
    createCompany, 
    updateCompanyId, 
    updateCompanyAll, 
    getCompanyId, 
    getCompanyAll, 
    deleteCompanyId, 
    deleteCompanyAll, 
    countCompany,
    getCompanyManagedBy 
} from '../controllers/company.js';

const company = express.Router();
company.get('/count', countCompany);
company.post('/', createCompany);
company.put('/:id', updateCompanyId);
company.put('/', updateCompanyAll);
company.get('/:id', getCompanyId);
company.get('/', getCompanyAll);
company.delete('/:id', deleteCompanyId);
company.delete('/', deleteCompanyAll);
company.get('/user/:userId', getCompanyManagedBy);
export default company;
