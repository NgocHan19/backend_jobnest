import mongoose from 'mongoose';

const BenefitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default mongoose.model('Benefit', BenefitSchema);
