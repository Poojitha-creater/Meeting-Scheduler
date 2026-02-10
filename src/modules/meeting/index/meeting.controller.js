const MeetingService = require('../service/meeting.service');

const createMeeting = async (req, res) => {
    try {
        const meeting = await MeetingService.createMeeting(req.body);
        res.status(201).json(meeting);
    } catch (error) {
        // This will return the 400 error for conflicts as required
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const getMeetings = async (req, res) => {
    try {
        // req.query captures filters like ?userId=... from the URL
        const meetings = await MeetingService.getAllMeetings(req.query);
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMeeting = async (req, res) => {
    try {
        const updated = await MeetingService.updateMeeting(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

const deleteMeeting = async (req, res) => {
    try {
        const result = await MeetingService.deleteMeeting(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

module.exports = { 
    createMeeting, 
    getMeetings, 
    updateMeeting, 
    deleteMeeting 
};