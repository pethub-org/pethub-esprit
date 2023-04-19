const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timestamps: true,
        strict: true
    }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
