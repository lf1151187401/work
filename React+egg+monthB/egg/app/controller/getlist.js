'use strict';

const Controller = require('egg').Controller;
class listController extends Controller {
    async index() {
        const { ctx } = this;
        let { id } = ctx.request.body;
        let data = await ctx.service.main.get(id)
        console.log(data, "data")
      
        let daan = await ctx.service.main.getOption(id);
        console.log(daan)
        ctx.body={code:0,data,daan}
    
    }
}

module.exports = listController;
