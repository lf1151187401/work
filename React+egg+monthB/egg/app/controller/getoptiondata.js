'use strict';

const Controller = require('egg').Controller;
class listController extends Controller {
    async index() {
        const { ctx } = this;
        let { id } = ctx.request.body;
        let data = await ctx.service.main.getOptionData(id)
        console.log(data)
        ctx.body = { code: 0, data }
    }
}

module.exports = listController;
