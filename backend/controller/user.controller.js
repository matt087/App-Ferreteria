const User = require('../models/user.model');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const {ci} = req.params;
        const user = await User.findOne({ci: ci});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { ci } = req.params;
        const user = await User.findOneAndUpdate({ci: ci}, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { ci } = req.params;
        const user = await User.findOneAndDelete({ci:ci});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted succesfully" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}