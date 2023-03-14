const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { create } = require("../services/user.service");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    try {
        const { firstname, lastname, password, confirmPassword, email } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password must be the same" })
        }

        const isUserExisting = await User.findOne({ email });
        if (isUserExisting) {
            return res.status(400).json({ message: `Email ${email} already being used` })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({ firstname, lastname, password: hashedPassword, email })
        await user.save();


        return res.status(201).json({ firstname: user.firstname, lastname: user.lastname, email: user.email, _id: user._id })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, password, email } = req.body;
        const { id } = req.params;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(id, { password: hashedPassword, email, firstname, lastname })
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        await user.deleteOne();
        return res.status(200).json({ message: `user ${id} deleted successfully` })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        return res.status(200).json({ email: user.email, username: user.username, _id: user._id, role: user.role, tokenVersion: user.tokenVersion, accountConfirmed: user.accountConfirmed });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
const getUsers = async (req, res) => {
    try {
        let users = await User.find({});
        users = users.map(user => {
            return { email: user.email, username: user.username, _id: user._id, role: user.role, tokenVersion: user.tokenVersion, accountConfirmed: user.accountConfirmed }
        })
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(401).json({ message: "Password and Confirm Password Must match" })
        }

        const payload = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
        // const user = await User.findById(payload.id);

        // TODO : extract crypting & hashing password into utils function

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(payload.id, { password: hashedPassword });

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error })
    }
}




module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    resetPassword
}