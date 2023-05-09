const User = require("../models/UserSchema");
const FriendRequest = require("../models/FriendRequestSchema");
const { createConversationService } = require("../services/conversation.service");
const { createNotificationService } = require("../services/notification.service");
const Conversation = require("../models/ConversationSchema");
const LoggedInUsers = require("../utils/users.socket");

const sendFriendRequestService = async ({ senderId, recieverId, status }) => {
    // TODO: Promise.all for better performance
    // TODO: create notification
    const request = new FriendRequest({ requester: senderId, recipient: recieverId, status });
    const r = await request.save();

    await createNotificationService({ type: "invitation", sender: senderId, receiver: recieverId, content: `sent you a friend request` })
    return r;
}

// TODO : new
const getUserFriendRequests = async (userId) => {
    const friendRequests = await FriendRequest.find({ recipient: userId, status: 'pending' })
        .populate({ path: "recipient", model: 'User' })
        .populate({ path: 'requester', model: 'User' })
    return friendRequests;
}
// TODO : new
const decline = async (friendRequestId) => {
    const fr = await FriendRequest.findByIdAndUpdate(friendRequestId, {
        status: 'rejected'
    }, { new: true })
    // TODO : notify user he has been declined
    // createNotificationService({ type: 'invitation', sender })
    return fr;
}
const accept = async (req, friendRequestId) => {
    console.log({ friendRequestId })
    const fr = await FriendRequest.findByIdAndUpdate(friendRequestId, {
        status: 'accepted'
    }, { new: true })
    console.log({ fr })
    const senderUser = await User.findByIdAndUpdate(fr.requester._id, {
        $addToSet: {
            friendList: fr.recipient._id
        }
    }, { new: true }).exec();

    const recieverUser = await User.findByIdAndUpdate(fr.recipient._id, {
        $addToSet: {
            friendList: fr.requester._id
        }
    }, { new: true }).exec();
    // TODO: create notification reciever accepted sender
    // TODO: create conversation 
    // console.log({ recieverUser })
    const c = await createConversationService(recieverUser._id, senderUser._id);
    console.log({ c })


    const io = req.app.get('socketio')
    const loggedInUsers = LoggedInUsers.getInstance();
    const socketId = loggedInUsers.getUser(recieverUser._id.toString())
    console.log(socketId, recieverUser._id)

    const notif = await createNotificationService({ type: 'invitation', sender: senderUser._id, receiver: recieverUser._id, content: `${recieverUser.firstname} accepted the friend request` })
    console.log({ notif })
    io.to(socketId).emit("getNewFriend", notif);

    // console.log({ notif })
    return fr;
}

const deleteFriendNew = async (req, userId, friendId) => {

    const user = await User.findByIdAndUpdate(userId, {
        $pull: {
            friendList: friendId
        }
    }, { new: true })
        .populate({ path: 'friendList', model: 'User' })
        .exec();
    console.log({ user })
    console.log({ friendId })
    const friend = await User.findByIdAndUpdate(friendId, {
        $pull: {
            friendList: userId
        }
    }, { new: true })
        .populate({ path: 'friendList', model: 'User' })
        .exec();
    // console.log({ friend })

    return true;
    // TODO : create notification user delete friend 
    // TODO : delete conversation 
}

// const declineFriendRequestService = async ({ senderId, recieverId }) => {
//     // TODO: Promise.all for better performance
//     // TODO: create notification

//     const senderUser = await User.findByIdAndUpdate(senderId, {
//         $pull: {
//             friendRequests: recieverId
//         },
//     }, { new: true }).exec();

//     const recieverUser = await User.findByIdAndUpdate(recieverId, {
//         $pull: {
//             friendRequests: senderId
//         }
//     }, { new: true }).exec();


// }
// const acceptFriendRequestService = async ({ senderId, recieverId }) => {
//     // TODO: Promise.all for better performance
//     // TODO: create notification
//     // TODO : create conversation 
//     const senderUser = await User.findByIdAndUpdate(senderId, {
//         $pull: {
//             friendRequests: recieverId
//         },
//         $addToSet: {
//             friendList: recieverId
//         }
//     }, { new: true }).exec();


//     const recieverUser = await User.findByIdAndUpdate(recieverId, {
//         $pull: {
//             friendRequests: senderId
//         },
//         $addToSet: {
//             friendList: senderId
//         }
//     }, { new: true }).exec();
//     await createConversationService(senderId, recieverId);
//     await createNotificationService({ type: "invitation", sender: senderId, receiver: recieverId, content: `${recieverUser.firstname} accepted your friend request` })
// }
const getUserByNameService = async (name, userId) => {
    let users = await User.find({
        $or: [
            { firstname: { $regex: name, $options: 'i' } }, // i option makes the search case-insensitive
            { lastname: { $regex: name, $options: 'i' } },
        ],
        $and: [
            {
                _id: { $ne: userId }
            }
        ]
    }, { password: 0, __v: 0 }).lean();
    users = users.map(user => {
        const currentPhoto = user.photos.find(photo => photo.isMain);
        return {
            ...user,
            currentPhoto
        }
    })

    return users;
}

const deleteFriendService = async (id, deleteUserId) => {
    // TODO : delete conversation
    await User.findByIdAndUpdate(id, {
        $pull: {
            friendList: deleteUserId
        }
    })
    await User.findByIdAndUpdate(deleteUserId, {
        $pull: {
            friendList: id
        }
    })
}

const deleteConversation = async () => { }

module.exports = {
    sendFriendRequestService,
    // declineFriendRequestService,
    // acceptFriendRequestService,
    getUserByNameService,
    // deleteFriendService,
    accept,
    decline,
    deleteFriendNew,
    getUserFriendRequests
}