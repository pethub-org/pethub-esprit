const { createEventService, deleteEventService, getEventService, getEventsService, updateEventService, participateEventService, unParticipateEventService } = require("../services/event.service");
const createEvent = async (req, res, next) => {
    try {
        const { title, eventDate, description } = req.body;
        const file = req.file;
        console.log({ file })
        const creatorId = req.user._id;
        const event = await createEventService({ title, eventDate, description, creatorId, image: file.path });
        return res.status(201).json({ event })
    } catch (error) {
        next(error);
    }
}

const updateEvent = async (req, res, next) => {
    // TODO : add check if the creator is trying to change the event
    try {
        const { id } = req.params;
        const { title, eventDate, description } = req.body;
        const file = req.file;
        if (!file) {
            await updateEventService(id, { title, eventDate, description });
            return res.status(200).json({ message: 'updated event successfully' })
        }

        await updateEventService(id, { title, eventDate, description, image: file.path });
        return res.status(200).json({ message: 'updated event successfully' })
    } catch (error) {
        next(error);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteEventService(id);
        return res.status(200).json({ message: 'deleted event successfully ' + id })
    } catch (error) {
        next(error)
    }
}

const getEvents = async (req, res, next) => {
    try {
        const events = await getEventsService();
        return res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

const getEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await getEventService(id);
        return res.status(200).json({ event })
    } catch (error) {
        next(error)
    }
}


const participateEvent = async (req, res, next) => {
    try {
        const { id: eventId } = req.params;
        const participantId = req.user._id;
        const event = await participateEventService(eventId, participantId)
        console.log({ event })
        return res.status(200).json({ message: `user ${participantId} joined ${eventId}` })
    } catch (error) {
        next(error)
    }
}
const unParticipateEvent = async (req, res, next) => {
    try {
        const { id: eventId } = req.params;
        const participantId = req.user._id;
        const event = await unParticipateEventService(eventId, participantId)
        return res.status(200).json({ message: `user ${participantId} left ${eventId}` })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEvent,
    participateEvent,
    unParticipateEvent
}