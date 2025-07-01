import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: false,
    },
    jobTitle: {
        type: String,
        required: false,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    responsibilities: {
        type: String,
        required: false,
    },
}, { _id: false });

const EducationSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: false,
    },
    degree: {
        type: String,
        required: false,
    },
    fieldOfStudy: {
        type: String,
        required: false,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
}, { _id: false });

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    proficiencyLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: false,
    },
}, { _id: false });

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    proficiencyLevel: {
        type: String,
        enum: ['Basic', 'Conversational', 'Fluent', 'Native'],
        required: false,
    },
}, { _id: false });

const CertificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    issuedBy: {
        type: String,
        required: false,
    },
    issueDate: {
        type: Date,
        required: false,
    },
    expiryDate: {
        type: Date,
        required: false,
    },
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    summary: {
        type: String,
        required: false,
    },
    experiences: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
    languages: [LanguageSchema],
    certifications: [CertificationSchema],
    profileImage: {
        type: String,
        required: false,
    },
    contactInfo: {
        phone: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        linkedin: {
            type: String,
            required: false,
        },
        github: {
            type: String,
            required: false,
        },
        portfolio: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);
