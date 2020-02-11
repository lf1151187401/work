'use strict';

const Controller = require('egg').Controller;
const jwt = require("jsonwebtoken")
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let { user, pwd } = ctx.request.body;
    console.log(user, pwd, "user,pwd")
    if (user === "") {
      ctx.body = { code: 1, msg: "账号不能为空" };
      return;
    }
    if (pwd === "") {
      ctx.body = { code: 1, msg: "密码不能为空" };
      return
    }
    let data = await ctx.service.main.find(user);
    console.log(data, "data.data")
    if (data.length === 0) {
      ctx.body = { code: 1, msg: "该账号未注册" };
      return
    }
    if (data[0].user !== user) {
      ctx.body = { code: 1, msg: "账号错误" }
      return
    }
    if (data[0].pwd !== pwd) {
      ctx.body = { code: 1, msg: "密码错误" }
      return
    }
    let token = jwt.sign({ ...data[0] }, this.app.config.keys);

    ctx.body = { code: 0, msg: "登录成功", token }
  }
}

module.exports = HomeController;
