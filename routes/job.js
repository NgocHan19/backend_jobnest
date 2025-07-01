import express from 'express';
import { 
    createJob, 
    updateJobId, 
    updateJobAll, 
    getJobId, 
    getJobAll, 
    deleteJobId, 
    deleteJobAll, 
    countJobs,
    getJobsByCategoryId,
    countJobsByCompany,
    countJobsByCompanyId,
    getJobsByCompanyId,
    getJobsByUserId
} from '../controllers/job.js';

const job = express.Router();
job.get('/count', countJobs);
job.get('/count-by-company', countJobsByCompany);
job.post('/', createJob);
job.put('/:id', updateJobId);
job.put('/', updateJobAll);
job.get('/:id', getJobId);
job.get('/', getJobAll);
job.delete('/:id', deleteJobId);
job.delete('/', deleteJobAll);
job.get('/category/:categoryId', getJobsByCategoryId);
job.get('/count-by-company/:companyId', countJobsByCompanyId);
job.get('/company/:companyId', getJobsByCompanyId);
job.get('/user/:userId', getJobsByUserId);
export default job;
