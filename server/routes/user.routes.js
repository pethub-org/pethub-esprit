const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, resetPassword, banAccount } = require("../controllers/user.controller")
const validationMiddleware = require('../middlewares/validation.middleware')
const { object, string, } = require('yup');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const hasRoleMiddleware = require('../middlewares/hasRole.middleware');


const createUserValidationSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().email().required(),
    password: string().required()
});

const resetPassowrdValidationSchema = object({
    token: string().required(),
    password: string().required(),
    confirmPassword: string().required(),
});

const requestResetPasswordValidationSchema = object({
    email: string().email().required()
});


const router = express.Router();


router.post('/reset-password', validationMiddleware(resetPassowrdValidationSchema), resetPassword)

router.post('/', validationMiddleware(createUserValidationSchema), createUser)
router.get('/', getUsers)
router.put('/ban/:id', authenticationMiddleware, hasRoleMiddleware('admin'), banAccount)

router.delete('/:id', authenticationMiddleware, deleteUser)
router.put('/:id', authenticationMiddleware, validationMiddleware(createUserValidationSchema), updateUser)

router.get('/:id', getUser)



module.exports = router;