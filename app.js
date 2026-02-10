const express = require('express');
const sequelize = require('./src/config/database');
const meetingRoutes = require('./src/modules/meeting/routes/meeting.routes');

// Import models to ensure relationships are established
const User = require('./src/modules/meeting/model/user.model');
const Meeting = require('./src/modules/meeting/model/meeting.model');

const app = express();

// Middleware to read JSON from Postman
app.use(express.json());

// Set up Relationships (as required by your task)
User.hasMany(Meeting, { foreignKey: 'userId', as: 'meetings' });
Meeting.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Use the routes
app.use('/', meetingRoutes);

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
        
        // This creates the tables in your sqlite file
        await sequelize.sync();
        
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();