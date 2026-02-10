const express = require('express');
const router = express.Router();

const { 
    createMeeting, 
    getMeetings, 
    updateMeeting, 
    deleteMeeting 
} = require('../index/meeting.controller');


const { createUser, getUser } = require('../index/user.controller');


router.post('/meetings', createMeeting);
router.get('/meetings', getMeetings);
router.put('/meetings/:id', updateMeeting);
router.delete('/meetings/:id', deleteMeeting);


router.post('/users', createUser);
router.get('/users/:id', getUser);

module.exports = router;