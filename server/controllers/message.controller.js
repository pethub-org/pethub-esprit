const { createMessageService, getUserConversationService } = require("../services/message.service");
const LoggedInUsers = require("../utils/users.socket");

const createMessage = async (req, res, next) => {
    try {

        const { conversationId, sender, text, recieverId } = req.body;

        const io = req.app.get('socketio')
        const loggedInUsers = LoggedInUsers.getInstance();
        const socketId = loggedInUsers.getUser(recieverId)



        console.log({ io }, loggedInUsers.getUsers());

        const message = await createMessageService({ conversationId, sender, text });
        // console.log({ message })
        io.to(socketId).emit("getMessage", { message });

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