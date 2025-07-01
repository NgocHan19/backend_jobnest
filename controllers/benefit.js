import Benefit from '../models/benefit.js';

export const createBenefit = async (req, res) => {
    const newBenefit = new Benefit(req.body);
    try {
        const savedBenefit = await newBenefit.save();
        res.status(200).json(savedBenefit);
    } catch (err) {
        next(err);
    }
};

export const getAllBenefits = async (req, res) => {
    try {
        const benefits = await Benefit.find();
        res.status(200).json(benefits);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server.', error: error.message });
    }
};
export const getBenefitById = async (req, res) => {
    try {
        const { id } = req.params;
        const benefit = await Benefit.findById(id);

        if (!benefit) {
            return res.status(404).json({ message: 'Không tìm thấy phúc lợi.' });
        }

        res.status(200).json(benefit);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server.', error: error.message });
    }
};


export const updateBenefit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description,icon } = req.body;

        const benefit = await Benefit.findByIdAndUpdate(
            id,
            { name, description,icon },
            { new: true, runValidators: true }
        );

        if (!benefit) {
            return res.status(404).json({ message: 'Không tìm thấy phúc lợi để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật phúc lợi thành công.', benefit });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server.', error: error.message });
    }
};
export const deleteBenefit = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBenefit = await Benefit.findByIdAndDelete(id);

        if (!deletedBenefit) {
            return res.status(404).json({ message: "Benefit not found" });
        }

        res.status(200).json({ message: "Benefit deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};