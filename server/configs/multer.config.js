const multer = require("multer");
const crypto = require("crypto");
const { storage } = require("./cloundiary.config");
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + crypto.randomUUID();
//         let ext = '';
//         if (file.mimetype === 'image/png') {
//             ext = '.png';
//         }
//         else {
//             ext = '.jpg'
//         }
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext)
//     }
// })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb({ message: 'Unsuppored file format' }, false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 4 },
    fileFilter
})

module.exports = upload;