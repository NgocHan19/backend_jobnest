import express from 'express';
import {
    createBenefit,
    getAllBenefits,
    getBenefitById,
    updateBenefit,
    deleteBenefit
} from '../controllers/benefit.js';

const benefit = express.Router();

benefit.post('/', createBenefit);

benefit.get('/', getAllBenefits);

benefit.get('/:id', getBenefitById);

benefit.put('/:id', updateBenefit);

benefit.delete('/:id', deleteBenefit);

export default benefit;
