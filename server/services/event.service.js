const Event = require("../models/EventSchema");

const createEventService = async (event) => {
    const e = new Event(event);
    await e.save();
    return e;
}

const updateEventService = async (id, event) => {
    return await Event.findByIdAndUpdate(id, { ...event }, { new: true })
}

const getEventService = async (id) => {
    return await Event.findById(id);
}

const getEventsService = async (event) => {
    return await Event.find({});
}

const deleteEventService = async (id) => {
    return await Event.findByIdAndDelete(id);
}
const participateEventService = async (eventId, participantId) => {
    return await Event.findByIdAndUpdate(eventId, {
        $addToSet: { participants: participantId }
    }, { new: true })
}
const unParticipateEventService = async (eventId, participantId) => {
    return await Event.findByIdAndUpdate(
        eventId,
        { $pull: { participants: { $in: [participantId] } } },
        { new: true })

}

module.exports = {
    createEventService,
    updateEventService,
    getEventService,
    getEventsService,
    deleteEventService,
    participateEventService,
    unParticipateEventService
}