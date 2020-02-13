'use strict';

const Controller = require('egg').Controller;
class AddController extends Controller {
    async index() {
        const { ctx, app } = this;
        let { isRadio,
            anonymous,
            title,
            description,
            option,
            deadline } = ctx.request.body
        let Data = {
            id: null,
            isRadio,
            anonymous,
            title,
            description,
            deadline,
            qqnumber: ctx.info.qqnumber,
            name: ctx.info.name
        }
        let data = await ctx.service.main.insert(Data);
        console.log(data, "data")
        if (data.affectedRows === 1) {
            let ticket_id = data.insertId;
            console.log(option, "option")
            option.forEach(async (item, index) => {
                let Data = { id: null, ticket_id, option_id: item.id, option_name: item.value }
                await ctx.service.main.insertOption(Data);
            })
            ctx.body = { code: 0, msg: "添加成功" }
            return
        }
        ctx.body = { code: 1, msg: "添加失败" }
    }
}

module.exports = AddController;
