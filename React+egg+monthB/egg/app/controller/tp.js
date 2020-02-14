'use strict';

const Controller = require('egg').Controller;
class listController extends Controller {
    async index() {
        const { ctx } = this;
        let { Data } = ctx.request.body;
        Data.forEach(async (item, index) => {
            item.count += 1;
            // console.log(item.count, "item")
            console.log(item, "123")
            let resData = await ctx.service.main.addCount(item)
            console.log(resData);

        })
        ctx.body = { code: 0, msg: "提交成功" }
    }
}

module.exports = listController;
