const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { sendFriendRequestService, getUserByNameService, accept, decline, deleteFriendNew, getUserFriendRequests } = require("../services/user.service");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token.service");
const sendEmail = require('../services/email.service');
const { uploadImg } = require('../configs/cloundiary.config')
const { deleteImage } = require('../services/image.service')

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

        // const user = await User.findById(id, { password: 0, __v: 0 });
        const user = await User.findById(id, { password: 0, __v: 0 })
            .populate({ path: "friendList", model: 'User' })
            .populate({ path: 'friendRequests', model: 'User' })
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
const getUsers = async (req, res) => {
    try {
        // todo : fix me sort photos.isMain by true photos[0] = {isMain:true, url:'http..'} 
        // const users = await User.find({}, { password: 0, __v: 0 }).sort({ 'photos.isMain': -1 });
        const users = await User.find({}, { password: 0, __v: 0 }).sort({ 'photos.isMain': -1 })
            .populate({ path: 'friendList', model: 'User' })
            .populate({ path: 'friendRequests', model: 'User' })


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
    const file = req.file;
    try {
        if (!userId) {
            return res.status(400).json({ error: "ID must be provided" })
        }
        if (!isMain) {
            return res.status(400).json({ error: "isMain must be provided" })
        }

        const user = await User.findById(userId, { password: 0, __v: 0 });

        if (!user) {
            return res.status(404).json({ error: 'user id not found' })
        }

        if (user?.photos?.length == 0) {
            user?.photos?.push({
                url: file.path,
                isMain
            })

        } else {
            if (isMain === 'true') {
                const i = user?.photos?.findIndex(img => img.isMain === true);
                if (i >= 0)
                    user.photos[i].isMain = false;
                user.photos.push({
                    url: file.path,
                    isMain
                })
            }
            else {
                user?.photos?.push({
                    url: file.path,
                    isMain
                })
            }

        }

        await user.save();

        return res.status(200).json(user)
    } catch (error) {
        return res.status(200).json({ error })
    }
}

const deletePhoto = async (req, res, next) => {
    try {
        const { imageUrl } = req.body;
        const userId = req.user._id;
        const { photoId } = req.params;
        const result = await deleteImage(imageUrl);
        if (result.result !== 'ok') {
            throw Error('Something went wrong')
        }

        const user = User.findByIdAndUpdate(userId, {
            $pull: { photos: { _id: photoId } }
        }, { strict: true, new: true }).exec();

        return res.status(200).json({ message: `${user.firstname} image deleted successfully` })
    } catch (error) {
        next(error)
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

const sendFriendRequest = async (req, res, next) => {
    try {
        const senderId = req.user._id.toString();
        const recieverId = req.params.id;
        await sendFriendRequestService({ senderId, recieverId, status: 'pending' })
        return res.status(200).json({ message: `user ${senderId} sent a friend request to ${recieverId}` })
    } catch (error) {
        next(error)
    }


}
const declineFriendRequest = async (req, res, next) => {
    try {
        const senderId = req.user._id.toString();
        const recieverId = req.params.id;
        await declineFriendRequestService({ senderId, recieverId })
        return res.status(200).json({ message: `user ${senderId} declined a friend request from ${recieverId}` })
    } catch (error) {
        next(error)
    }
}

const acceptFriendRequest = async (req, res, next) => {
    try {
        const senderId = req.user._id.toString();
        const recieverId = req.params.id;
        await acceptFriendRequestService({ senderId, recieverId })
        return res.status(200).json({ message: `user ${senderId} accepted a friend request from ${recieverId}` })
    } catch (error) {
        next(error)
    }
}

// todo: should return all users except logged in user & sort photos by isMain=true
const getUserByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const loggedInUserId = req.user._id;
        const users = await getUserByNameService(name, loggedInUserId)
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const deleteFriend = async (req, res, next) => {
    try {
        const { deleteUserId } = req.params
        const id = req.user._id.toString();
        await deleteFriendService(id, deleteUserId)
        return res.status(200).json({ message: `user ${id} deleted from your friend list` })
    } catch (error) {
        next(error)
    }
}

// TODO :
const sendFriendRequestController = async (req, res, next) => {
    try {
        const senderId = req.user.id;
        const { recieverId } = req.params;
        const r = await sendFriendRequestService({ senderId, recieverId, status: 'pending' })
        return res.status(200).json(r)
    } catch (error) {
        next(error);
    }
}
const acceptFriendRequestController = async (req, res, next) => {
    try {
        const { friendRequestId } = req.params;

        const r = await accept(friendRequestId)
        return res.status(200).json(r)
    } catch (error) {
        next(error);
    }
}
const declineFriendRequestController = async (req, res, next) => {
    try {
        const { friendRequestId } = req.params;

        const r = await decline(friendRequestId)
        return res.status(200).json(r)
    } catch (error) {
        next(error);
    }
}

const getUserFriendRequestsController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const friendRequests = await getUserFriendRequests(userId)
        return res.status(200).json(friendRequests)
    } catch (error) {
        next(error)
    }
}

const deleteFriendRequestcontroller = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { friendId } = req.params;
        const isSuccess = await deleteFriendNew(userId, friendId)
        return res.status(200).json(isSuccess)
    } catch (error) {
        next(error)
    }
}
const setPhotoToMainController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { photoId } = req.params;
        const user = await User.findById(userId);

        for (let i = 0; i < user.photos.length; i++) {
            if (user.photos[i]._id.toString() === photoId) {
                user.photos[i].isMain = true;
            } else {
                user.photos[i].isMain = false;
            }
        }
        await user.save();
        return res.status(200).json(user)
    } catch (error) {
        next(error)
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
    resetPasswordEmail,
    sendFriendRequest,
    declineFriendRequest,
    acceptFriendRequest,
    getUserByName,
    deleteFriend,
    deletePhoto,


    sendFriendRequestController,
    acceptFriendRequestController,
    getUserFriendRequestsController,
    declineFriendRequestController,
    deleteFriendRequestcontroller,
    setPhotoToMainController

}