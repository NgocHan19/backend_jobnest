import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    icon: {  
        type: String,  
        required: false,  
    }
},{timestamps:true});

export default mongoose.model('Category', CategorySchema);
