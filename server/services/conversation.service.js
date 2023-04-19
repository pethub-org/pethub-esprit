const Conversation = require("../models/ConversationSchema");

const createConversationService = async (senderId, receiverId) => {
    const newConversation = new Conversation({
        members: [senderId, receiverId],
    });
    return await newConversation.save();
}
const getUserConversationService = async (userId) => {
    const conversation = await Conversation.find({
        members: { $in: [userId] },
    });
    return conversation;
}
const getTwoUsersConversationService = async (firstUserId, secondUserId) => {
    const conversation = await Conversation.findOne({
        members: { $all: [firstUserId, secondUserId] },
    });
    return conversation;
}

// todo : change code
const getUserLatestConversationService = async (userId) => {
    const conversations = await Conversation.find({
        members: { $in: [userId] }
    });
    return conversations;
    // return "test";
}

module.exports = {
    createConversationService,
    getUserConversationService,
    getTwoUsersConversationService,
    getUserLatestConversationService
}