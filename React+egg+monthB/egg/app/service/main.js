const Service = require('egg').Service;

class UserService extends Service {
    async find(user) {
        return await this.app.mysql.select("user", { where: { user: user } })
    }
    async list() {
        return await this.app.mysql.select("list")
    }
}

module.exports = UserService;