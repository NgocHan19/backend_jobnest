import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        return res.status(200).json({ message: 'User added successfully.', user: savedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong.', error });
    }
};


export const getUserId = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUserId = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const updateUserAll = async (req, res, next) => {
    try {
        const updatedUsers = await User.updateMany(
            req.body.filter, // Điều kiện để cập nhật
            { $set: req.body.update } // Dữ liệu cần cập nhật
        );
        res.status(200).json(updatedUsers);
    } catch (err) {
        next(err);
    }
};

export const getUserAll = async (req, res, next) => {
    try {
        const users = await User.find(req.query); // Lọc người dùng theo query (nếu có)
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const deleteUserId = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        next(err);
    }
};

export const deleteUserAll = async (req, res, next) => {
    try {
        const deletedUsers = await User.deleteMany(req.body.filter); // Xóa nhiều người dùng dựa vào điều kiện
        res.status(200).json(deletedUsers);
    } catch (err) {
        next(err);
    }
};

export const countUsers = async (req, res, next) => {
    try {
      const userCount = await User.countDocuments();
      res.status(200).json({totalUsers: userCount });
    } catch (err) {
      next(err);
    }
  };



