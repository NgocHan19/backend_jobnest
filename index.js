import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//-----------------IMPORT CÁC ROUTES----------------------------------
import application from './routes/application.js';
import company from './routes/company.js';
import job from './routes/job.js';
import user from './routes/user.js';
import category from './routes/category.js'
import benefit from './routes/benefit.js';
import profile from './routes/profile.js';
//--------------------------------------------------------------------
const app=express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
//-----------------------CAC ROUTES-----------------------------------
app.use('/application/',application);
app.use('/company/',company);
app.use('/job/',job);
app.use('/category/',category);
app.use('/user/',user);
app.use('/benefit/',benefit);
app.use('/profile/',profile);
app.use('/uploads', express.static('uploads'));
//--------------------------------------------------------------------
app.use((err,req,res,next)=>{
    const errorStatus = err.status||500;
    const errorMessage = err.message|| 'Đã xảy ra lỗi!!';
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
});
const connectMongoDB= async ()=>{
    try{
        await mongoose.connect(process.env.DB);
        console.log('Kết nối với dữ liệu !!');
    }
    catch(err){
        console.log("Lỗi kết nối với dữ liệu");
        throw err;
    }
}
mongoose.connection.on('error',(err)=>{
    console.log(`Lỗi kết nối cơ sở dữ liệu: ${err.message}`);
});

const PORT =process.env.PORT;
app.listen(PORT,()=>{
    connectMongoDB();
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
})
