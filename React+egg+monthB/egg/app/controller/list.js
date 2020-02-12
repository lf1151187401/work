'use strict';

const Controller = require('egg').Controller;
class listController extends Controller {
    async index() {
        const { ctx } = this;
        let data = await ctx.service.main.list()
        ctx.body = {code:0,data}
    }
}

module.exports = listController;
