import mongoose from 'mongoose';
const CompanySchema=new mongoose.Schema({
    nameCompany:{
        type:String,
        required:true,
    },
    logo:{
        type:String,
        required:false,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    website:{
        type:String,
        required:false,
    },
    managedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    isCompanyVerified:{
        type:Boolean,
        required:false,
        default:false,
    },
    employees:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'User',
        required:false,
    }
},
    {timestamps:true}
);
export default mongoose.model('Company',CompanySchema);
