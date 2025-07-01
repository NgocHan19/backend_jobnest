import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: false,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: false, 
    },
    cv: {
        type: String,
        required: false,
    },
    coverLetter: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending', 
    },
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);
