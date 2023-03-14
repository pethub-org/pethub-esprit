const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, } = require("../controllers/user.controller")
const validationMiddleware = require('../middlewares/validation.middleware')
const { object, string, } = require('yup');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const hasRoleMiddleware = require('../middlewares/hasRole.middleware');




const router = express.Router();


router.post('/', createUser)
router.get('/' , getUsers)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

router.get('/:id', getUser)


module.exports = router;