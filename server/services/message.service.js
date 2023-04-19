const Message = require("../models/MessageSchema");


const createMessageService = async (message) => {
    const m = new Message(message);
    return await m.save();
}
const getUserConversationService = async (conversationId) => {
    const messages = await Message.find({ conversationId })
    return messages;
}
module.exports = {
    createMessageService,
    getUserConversationService
}