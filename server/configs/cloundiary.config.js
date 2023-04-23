const cloudinary = require('cloudinary').v2
require('dotenv').config();
const crypto = require("crypto")
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => 'profile_imgs',
        format: async (req, file) => {
            // async code using `req` and `file`
            // ...
            return 'jpeg';
        },
        unique_filename: true,

        public_id: (req, file) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + crypto.randomUUID();
            return uniqueSuffix;
        }
    },
});


module.exports = {
    storage,
    cloudinary
};

