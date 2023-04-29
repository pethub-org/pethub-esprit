const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, resetPassword, banAccount, updateRole, uploadPhoto, confirmAccountAdmin, adminUpdateUser, resetPasswordEmail, getUserByName, deletePhoto,

    acceptFriendRequestController, declineFriendRequestController, deleteFriendRequestcontroller, getUserFriendRequestsController, sendFriendRequestController

} = require("../controllers/user.controller")
const validationMiddleware = require('../middlewares/validation.middleware')
const { object, string, } = require('yup');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const hasRoleMiddleware = require('../middlewares/hasRole.middleware');
const upload = require("../configs/multer.config");


const createUserValidationSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().email().required(),
    password: string().required()
});

const adminUpdateUserSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().email().required(),
    // password: string().required()
});

const resetPassowrdValidationSchema = object({
    token: string().required(),
    password: string().required(),
    confirmPassword: string().required(),
});

const requestResetPasswordValidationSchema = object({
    email: string().email().required()
});

const updateRoleSchema = object({
    role: string().required()
})

const router = express.Router();

//  old
// router.put('/add-friend/:id', authenticationMiddleware, sendFriendRequest);
// router.put('/decline-friend-request/:id', authenticationMiddleware, declineFriendRequest);
// router.put('/accept-friend/:id', authenticationMiddleware, acceptFriendRequest);
// router.delete('/delete-friend/:deleteUserId', authenticationMiddleware, deleteFriend);
// router.get('/search/:name', authenticationMiddleware, getUserByName);

// todo : new
router.put('/add-friend/:recieverId', authenticationMiddleware, sendFriendRequestController);
router.put('/decline-friend-request/:friendRequestId', authenticationMiddleware, declineFriendRequestController);
router.put('/accept-friend/:friendRequestId', authenticationMiddleware, acceptFriendRequestController);
router.delete('/delete-friend/:friendId', authenticationMiddleware, deleteFriendRequestcontroller);
router.get('/friend-requests', authenticationMiddleware, getUserFriendRequestsController);
router.get('/search/:name', authenticationMiddleware, getUserByName);


router.post('/reset-password', validationMiddleware(resetPassowrdValidationSchema), resetPassword)

router.post('/email/reset-password', validationMiddleware(requestResetPasswordValidationSchema), resetPasswordEmail)

router.post('/', validationMiddleware(createUserValidationSchema), createUser)

router.get('/', authenticationMiddleware, getUsers)
router.put('/ban/:id', authenticationMiddleware, hasRoleMiddleware('admin'), banAccount)

router.put('/update/role/:id', authenticationMiddleware, hasRoleMiddleware('admin'), validationMiddleware(updateRoleSchema), updateRole)
router.put('/admin/confirm/:id', authenticationMiddleware, hasRoleMiddleware('admin'), confirmAccountAdmin)

// photos
router.post('/update/photos/:userId', authenticationMiddleware, upload.single('image'), uploadPhoto)
router.delete('/update/photos/:photoId', authenticationMiddleware, deletePhoto)

router.delete('/:id', authenticationMiddleware, hasRoleMiddleware('admin'), deleteUser)

router.put('/:id', authenticationMiddleware, validationMiddleware(createUserValidationSchema), updateUser)

router.put('/admin/update/user/:id', authenticationMiddleware, hasRoleMiddleware('admin'), validationMiddleware(adminUpdateUserSchema), adminUpdateUser)

router.get('/:id', authenticationMiddleware, getUser)



module.exports = router;