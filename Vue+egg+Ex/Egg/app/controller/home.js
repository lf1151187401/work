'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let data = await ctx.service.main.getlist()
    ctx.body = { code: 0, data }
  }
}

module.exports = HomeController;
