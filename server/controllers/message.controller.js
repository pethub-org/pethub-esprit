const { createMessageService, getUserConversationService } = require("../services/message.service");
const SocketServer = require("../utils/socket.server");
const LoggedInUsers = require("../utils/users.socket");

const createMessage = async (req, res, next) => {
    try {
        // let io = SocketServer.getInstance();
        // let loggedInUsers = LoggedInUsers.getInstance();

        const { conversationId, sender, text } = req.body;
        const message = await createMessageService({ conversationId, sender, text });
        return res.status(200).json(message);
    } catch (error) {
        next(error);
    }
}
const getUserConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const messages = await getUserConversationService(conversationId);
        return res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createMessage,
    getUserConversation
}