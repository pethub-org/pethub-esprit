const { createConversationService, getUserConversationService, getTwoUsersConversationService, getUserLatestConversationService } = require("../services/conversation.service");

// TODO : after accepting a user create conversation
const createConversation = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.body;
        const conversation = await createConversationService(senderId, receiverId);
        return res.status(200).json(conversation);
    } catch (error) {
        next(error)
    }
}

const getUserConversation = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const conversation = await getUserConversationService(userId);
        return res.status(200).json(conversation);
    } catch (error) {
        next(error)
    }
}

const getTwoUsersConversation = async (req, res, next) => {
    try {
        const { firstUserId, secondUserId } = req.params;
        const conversation = await getTwoUsersConversationService(firstUserId, secondUserId);
        return res.status(200).json(conversation);
    } catch (error) {
        next(error)
    }
}

const getUserLatestConversation = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const conversations = await getUserLatestConversationService(userId);
        return res.status(200).json(conversations);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createConversation,
    getUserConversation,
    getTwoUsersConversation,
    getUserLatestConversation
}