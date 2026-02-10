const User = require('../model/user.model');

class UserService {
    
    async createUser(userData) {
        return await User.create(userData);
    }

    
    async getUserById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }
}

module.exports = new UserService();