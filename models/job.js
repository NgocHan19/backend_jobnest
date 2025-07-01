import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    location:{
        type:String,
        required:false,
    },
    type:{
        type:String,
        required:true,
        enum:['full_time', 'part_time', 'freelance']
    },
    exp:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:false,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    deadline: {
        type: Date, 
        required: true,
    },
    benefits: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Benefit',
    }]
},{timestamps:true});

export default mongoose.model('Job', JobSchema);
