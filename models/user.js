import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: true,
        enum: ['job_seeker', 'job_poster', 'admin'],
        default: 'job_seeker',
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'deleted'],
        default: 'active',
    },
    verificationCode: { type: String }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
