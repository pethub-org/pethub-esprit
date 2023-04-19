const { cloudinary } = require("../configs/cloundiary.config");

const deleteImage = async (imageUrl) => {
    const arr = imageUrl.split('/')
    const public_id = arr[arr.length - 1].split('.')[0]
    const res = await cloudinary.uploader.destroy("profile_imgs/" + public_id)
    return res;
}

module.exports = {
    deleteImage
}