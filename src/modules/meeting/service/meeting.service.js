const Meeting = require('../model/meeting.model');
const { Op } = require('sequelize');

class MeetingService {
    // 1. Create Meeting with Conflict Check
    async createMeeting(meetingData) {
        const { startTime, endTime } = meetingData;

        // Validation Rule: startTime < endTime
        if (new Date(startTime) >= new Date(endTime)) {
            const error = new Error('startTime must be before endTime');
            error.statusCode = 400;
            throw error;
        }

        // Business Rule: Conflict check logic
        const conflict = await Meeting.findOne({
            where: {
                [Op.and]: [
                    { startTime: { [Op.lt]: endTime } },
                    { endTime: { [Op.gt]: startTime } }
                ]
            }
        });

        if (conflict) {
            const error = new Error('Time slot already booked');
            error.statusCode = 400;
            throw error;
        }

        return await Meeting.create(meetingData);
    }

    // 2. List Meetings with Optional Filters (User, Date Range)
    async getAllMeetings(filters = {}) {
        const { userId, startDate, endDate } = filters;
        let whereClause = {};

        if (userId) {
            whereClause.userId = userId;
        }

        // Filter by date range if both are provided
        if (startDate && endDate) {
            whereClause.startTime = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        return await Meeting.findAll({ where: whereClause });
    }

    // 3. Get Single Meeting by ID
    async getMeetingById(id) {
        const meeting = await Meeting.findByPk(id);
        if (!meeting) {
            const error = new Error('Meeting not found');
            error.statusCode = 404;
            throw error;
        }
        return meeting;
    }

    // 4. Update Meeting
    async updateMeeting(id, updateData) {
        const meeting = await this.getMeetingById(id);
        return await meeting.update(updateData);
    }

    // 5. Delete Meeting
    async deleteMeeting(id) {
        const meeting = await this.getMeetingById(id);
        await meeting.destroy();
        return { message: 'Meeting deleted successfully' };
    }
}

module.exports = new MeetingService();