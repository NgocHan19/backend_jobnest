import mongoose from 'mongoose';
import multer from 'multer';
import express from 'express';
import { 
    createApplication, 
    updateApplicationId, 
    updateApplicationAll, 
    getApplicationId, 
    getApplicationIdAll, 
    deleteApplicationId, 
    deleteApplicationAll, 
    countApplication ,
    getApplicationsByJobId
} from '../controllers/application.js';

const application = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });
application.get('/count', countApplication);
application.post('/', upload.single('cv'), createApplication);
application.put('/:id', updateApplicationId);
application.put('/', updateApplicationAll);
application.get('/:id', getApplicationId);
application.get('/', getApplicationIdAll);
application.delete('/:id', deleteApplicationId);
application.delete('/', deleteApplicationAll);
application.get('/job/:jobId', getApplicationsByJobId);

export default application;
