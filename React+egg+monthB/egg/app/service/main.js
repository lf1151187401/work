const Service = require('egg').Service;

class UserService extends Service {
    async find(user) {
        return await this.app.mysql.select("user", { where: { user: user } })
    }
    async list() {
        return await this.app.mysql.select("list")
    }
    async insert(data) {
        let { id, qqnumber, title, isRadio, anonymous, deadline, description, name } = data
        return await this.app.mysql.insert("list", { id, qqnumber, title, isRadio, anonymous, deadline, description, name })
    }
    async insertOption(data) {
        let { id, ticket_id, option_id, option_name } = data
        return await this.app.mysql.insert("option", { id, ticket_id, option_id, option_name })
    }
    async get(id) {
        return await this.app.mysql.select("list", { where: { id: id } })
    }
    async getOption(id) {
        return await this.app.mysql.select("option", { where: { ticket_id: id } })
    }

    async addCount(it) {
  
        let { id, ticket_id, option_name, option_id, count } = it
        return await this.app.mysql.update("option", { id, ticket_id, option_name, option_id, count })
    }
}

module.exports = UserService;