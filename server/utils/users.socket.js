class User {
    #users;
    constructor() {
        this.users = new Map();
    }

    getUsers() {
        return this.users;
    }
    removeUser = (socketId) => {
        this.users.delete(socketId)
    };

    getUser = (userId) => {
        return this.users.get(userId);
    };
    addUser = (userId, socketId) => {
        this.users.set(userId, socketId)
    }
}
class LoggedInUsers {
    #user;
    static getInstance = () => {
        if (!this.user) {
            this.user = new User();
        }
        return this.user;

    }
};


module.exports = LoggedInUsers;