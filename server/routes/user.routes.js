const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, resetPassword, banAccount, updateRole, uploadPhoto, confirmAccountAdmin, adminUpdateUser, resetPasswordEmail } = require("../controllers/user.controller")
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


router.post('/reset-password', validationMiddleware(resetPassowrdValidationSchema), resetPassword)

router.post('/email/reset-password', validationMiddleware(requestResetPasswordValidationSchema), resetPasswordEmail)

router.post('/', validationMiddleware(createUserValidationSchema), createUser)
router.get('/', getUsers)
router.put('/ban/:id', authenticationMiddleware, hasRoleMiddleware('admin'), banAccount)

router.put('/update/role/:id', authenticationMiddleware, hasRoleMiddleware('admin'), validationMiddleware(updateRoleSchema), updateRole)
router.put('/admin/confirm/:id', authenticationMiddleware, hasRoleMiddleware('admin'), confirmAccountAdmin)
router.post('/update/photos/:userId', authenticationMiddleware, upload.single('image'), uploadPhoto)

router.delete('/:id', deleteUser)

router.put('/:id', authenticationMiddleware, validationMiddleware(createUserValidationSchema), updateUser)

router.put('/admin/update/user/:id', validationMiddleware(adminUpdateUserSchema), adminUpdateUser)

router.get('/:id', getUser)



module.exports = router;