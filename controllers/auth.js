import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { sendEmail } from '../utils/email.js'; 
dotenv.config();
export const register=async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
      role:"job_seeker",
    });

        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err)
    {
        next(err);
    }
};
export const registerPoster = async (req, res, next) => {
  try {
      const { email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return next(createError(400, "Email đã tồn tại!"));

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
          ...req.body,
          password: hash,
          isVerified: role === "job_poster" ? false : true, 
      });

      await newUser.save();
      
      if (role === "job_poster") {
        const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSdCb3-ArRdXrOLMZ4Aqu1epiA18tRS1zsurqsxe1tmUE2inCw/viewform?usp=sharing";
        console.log("Sending confirmation email for job_poster to:", email);
        const emailSubject = "Xác nhận đăng ký nhà tuyển dụng";
        const emailText = `Vui lòng điền form sau để xác thực: ${googleFormLink}`;
        await sendEmail(email, emailSubject, emailText);
    }
    

      res.status(200).send("Người dùng đã được tạo.");
  } catch (err) {
      next(err);
  }
};
export const login = async (req, res, next) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(createError(404, "Không tìm thấy email!"));

      if (user.role === "job_poster" && !user.isVerified) {
          return next(createError(403, "Tài khoản chưa được xác minh!"));
      }

      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect) return next(createError(400, "Sai mật khẩu!"));

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT);

      const { password, ...otherDetails } = user._doc;
      res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ details: { ...otherDetails }, token, role: user.role });
  } catch (err) {
      next(err);
  }
};