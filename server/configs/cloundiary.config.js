const cloudinary = require('cloudinary').v2
require('dotenv').config();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = async (filePath) => {
    return await cloudinary.uploader.upload(filePath)
    // return await cloudinary.uploader.
}