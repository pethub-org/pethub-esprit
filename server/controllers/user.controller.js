const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { create } = require("../services/user.service");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token.service");
const sendEmail = require('../services/email.service');
const cloudinaryUpload = require('../configs/cloundiary.config')

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
        return res.status(200).json({ email: user.email, username: user.username, _id: user._id, role: user.role, tokenVersion: user.tokenVersion, accountConfirmed: user.accountConfirmed, ban: user.ban, photos: user.photos, firstname: user.firstname, lastname: user.lastname });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
const getUsers = async (req, res) => {
    try {
        let users = await User.find({});
        users = users.map(user => {
            return { email: user.email, username: user.username, _id: user._id, role: user.role, tokenVersion: user.tokenVersion, accountConfirmed: user.accountConfirmed, ban: user.ban, photos: user.photos, firstname: user.firstname, lastname: user.lastname }
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

const banAccount = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "ID must be provided" });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { ban: true });
        return res.status(200).json({ message: `Account ID : ${id} has been banned` });
    } catch (error) {
        return res.status(500).json({ error })
    }

}
const updateRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID must be provided" })
    }
    if (role !== 'admin' && role !== 'user') {
        return res.status(400).json({ error: "Role must be admin or user" })
    }

    try {
        const user = await User.findByIdAndUpdate(id, { role });
        return res.status(200).json({ message: `Account ID : ${id} has been updated to ${role}.` });
    } catch (error) {
        return res.status(500).json({ error })
    }

}

const uploadPhoto = async (req, res) => {
    const { userId } = req.params;
    let { isMain } = req.body;
    try {
        if (!userId) {
            return res.status(400).json({ error: "ID must be provided" })
        }
        if (!isMain) {
            isMain = false;
        }
        const user = await User.findById(userId);
        const file = req.file;
        const data = await cloudinaryUpload(file.path);
        console.log({ user })
        if (user.photos.length == 0) {
            user.photos.push({
                url: data.url,
                isMain: true
            })
        } else {
            user.photos.push({
                url: data.url,
                isMain
            })
        }
        await user.save();

        return res.status(200).json({ message: 'successfully uploaded ', email: user.email, firstname: user.firstname, lastname: user.lastname, _id: user._id, role: user.role, tokenVersion: user.tokenVersion, accountConfirmed: user.accountConfirmed, ban: user.ban, photos: user.photos })
    } catch (error) {
        return res.status(200).json({ error })
    }
}

const confirmAccountAdmin = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ID must be provided' });
    }
    try {
        const user = await User.findByIdAndUpdate(id, { accountConfirmed: true })
        return res.status(200).json({ message: `Account ${id} has been confirmed.` })
    } catch (error) {
        return res.status(500).json({ error })
    }
}


const adminUpdateUser = async (req, res) => {
    try {
        const { firstname, lastname, email } = req.body;
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { email, firstname, lastname })
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const resetPasswordEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: 'Invalid email' });
        }
        const emailToken = generateToken(user, 'email_token');

        // const body = `<form action="http://localhost:8080/auth/email/reset-password" method="POST"
        //     style="display: flex; align-items: center; justify-content: center;  height: 400px;">
        //     <div style="display: flex;
        //     flex-direction: column;
        //     justify-content: space-between;
        //     align-items: center;
        //     margin-top:20px
        //     ">
        //         <input value="${emailToken}" name="token" hidden/>
        //         <div>
        //             <input type="text" name="password" placeholder="password" style="
        //                         border-radius:25px;
        //                         border:1px solid #3E54AC;
        //                         padding:10px;
        //                         font-size: 16px;
        //                         text-align: center;
        //                         ">
        //         </div>

        //         <div style="margin-top:20px; margin-bottom: 20px;">
        //             <input style="
        //                          border-radius:25px;
        //                          border:1px solid #3E54AC;
        //                         padding:10px;
        //                         font-size: 16px;
        //                         text-align: center;
        //                                 " type="text" name="confirm" placeholder="confirm password">

        //         </div>
        //         <div>
        //             <button type="submit" style="
        //                             border-radius:25px;  
        //                             padding:12px;           
        //                             font-size: 16px;
        //                             text-align: center;
        //                             color:white;
        //                             background-color: #3E54AC;
        //                             border:1px solid #3E54AC;
        //                             cursor: pointer;
        //                             ">Change Your Passwords</button>
        //         </div>
        //     </div>
        // </form>`;
        const body = `Forgot Password ? to Change Your Passwords Click <a href="${process.env.FRONT_URl}/users/reset-password/${emailToken}" target="_blank"> here</a>.
            <small> (If you did not request this password. Please Contact Admin</small>
        `;
        await sendEmail(email, 'Forgot your password ?', body);
        return res.status(200).json({ message: 'Reset Password Email has been sent successfully.' })
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
    resetPassword,
    banAccount,
    updateRole,
    uploadPhoto,
    confirmAccountAdmin,
    adminUpdateUser,
    resetPasswordEmail

}