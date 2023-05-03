const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema(
    {
        userId: {
            ref: 'User',
            required: true,
            type: mongoose.Schema.Types.ObjectId,

        },
        desc: {
            type: String,
            max: 500
        },
        image: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        shares: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        },
        tags: {
            type: [String],
            default: []
        },
        location: {
            type: {
                type: String,
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
        hashtags: {
            type: [String],
            default: [],
            required: false
        },
        reports: [
            {
                reason: {
                    type: String,
                    required: true
                },
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        feeling: {
            type: String,
            enum: ["happy", "sad", "angry", "excited", "bored"],
            default: "happy"
        }
    },
    { timestamps: true }
);

PostSchema.index({ location: '2dsphere' }); // Add a geospatial index for the location field

module.exports = mongoose.model('Post', PostSchema);
