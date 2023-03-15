const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { create } = require("../services/user.service");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token.service");
const sendEmail = require('../services/email.service');

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

        const emailToken = generateToken(user, 'email_token');

        // const body = `<h3> ${user.firstname} </h3> to confirm your account please click this link ${process.env.FRONT_URL}/confirm/${emailToken}.<h1>This link will expire in 30m.</h1>`;
        const body = `<span style="text-align: center; font-weight: 700;"> ${user.firstname} </span> <span>to confirm your account please
        click
        this link</span>
     <a href="${process.env.FRONT_URL}/auth/confirm/${emailToken}" style="color:cornflowerblue; text-decoration: none; font-size: 20px;">here</a>.<p
        style="color:red; margin-left: 12px; font-size: 20px; ">This link will expire
        in 30m.</p>`

        await sendEmail(user.email, "Confirm your Account.", body);

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
        if (!id) {
            return res.status(400).json({ error: "id is missing" });
        }
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
        if (!id) {
            return res.status(400).json({ error: "id is missing" });
        }

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