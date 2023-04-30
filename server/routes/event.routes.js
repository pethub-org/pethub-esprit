const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, participateEvent, unParticipateEvent } = require('../controllers/event.controller');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const yup = require('yup');
const upload = require('../configs/multer.config');


// TODO : add validation middleware & authentication middleware
// TODO : get event by dates
// TODO : get event by categories
// TODO : get Event by name
// TODO : Create Private Event
// TODO : Add User to Event
// TODO : Accept invitation to Event (prive event admin accepts invitation, public event user accepts invitation)
// TODO : Img upload for Event

router.post('/', authenticationMiddleware, upload.single('image'), createEvent)
router.get('/', getEvents)
router.get('/:id', getEvent)
router.put('/:id', upload.single('image'), updateEvent)
router.delete('/:id', deleteEvent)

router.put('/participate/:id', authenticationMiddleware, participateEvent)
router.put('/unparticipate/:id', authenticationMiddleware, unParticipateEvent)


module.exports = router;