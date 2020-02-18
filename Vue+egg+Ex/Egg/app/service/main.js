const Service = require('egg').Service;

class OverService extends Service {
    async getlist() {
        return await this.app.mysql.select('shoplist');
    }
}

module.exports = OverService;