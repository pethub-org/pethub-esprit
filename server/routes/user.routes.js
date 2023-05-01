const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, resetPassword, banAccount, updateRole, uploadPhoto, confirmAccountAdmin, adminUpdateUser, resetPasswordEmail, getUserByName, deletePhoto, setPhotoToMainController,

    acceptFriendRequestController, declineFriendRequestController, deleteFriendRequestcontroller, getUserFriendRequestsController, sendFriendRequestController

} = require("../controllers/user.controller")
const validationMiddleware = require('../middlewares/validation.middleware')
const { object, string, } = require('yup');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const hasRoleMiddleware = require('../middlewares/hasRole.middleware');
const upload = require("../configs/multer.config");
const User = require("../models/UserSchema")


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
router.put('/update/photos/:photoId', authenticationMiddleware, deletePhoto)
router.put('/update/photos/main/:photoId', authenticationMiddleware, setPhotoToMainController)

router.delete('/:id', authenticationMiddleware, hasRoleMiddleware('admin'), deleteUser)

router.put('/:id', authenticationMiddleware, validationMiddleware(createUserValidationSchema), updateUser)

router.put('/admin/update/user/:id', authenticationMiddleware, hasRoleMiddleware('admin'), validationMiddleware(adminUpdateUserSchema), adminUpdateUser)

router.get('/:id', authenticationMiddleware, getUser)

//follow 
router.put("/:id/follow", async (req, res) => {
    // mouch nafss id ok
    // console.log('follow')
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            //follow 
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followersPeople: req.params.id } })
                res.status(200).json("user has been followed")
            }
            //deja 3amelou follow
            else {
                res.status(403).json("already follow this person")

            }
        }
        catch (err) {
            res.status(500).json(err)

        }
    }
    //nafss id  no
    else {
        res.status(403).json("you can't follow yourself !")
    }
})



// 
// unfllow

router.put("/:id/unfollow", async (req, res) => {
    // mouch nafss id ok
    // console.log("here")
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            //unfollow 
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followersPeople: req.params.id } })
                res.status(200).json("user has been unfollowed")
            }
            //deja 3amelou unfollow
            else {
                res.status(403).json("you already unfollow this person")

            }
        }
        catch (err) {
            res.status(500).json(err)

        }
    }
    //nafss id  no
    else {
        res.status(403).json("you don't follow this person !")
    }
})



module.exports = router;