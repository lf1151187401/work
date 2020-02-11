let jwt = require("jsonwebtoken")
let url = require("url")
function verifyFunc(token, ctx) {
    return new Promise(res => {
        jwt.verify(token, ctx.app.config.keys, (error, result) => {
            if (error) throw error
            res(result)
        })
    })
}
module.exports = options => {
    return async (ctx, next) => {

        // protocol : 'http' ,
        // auth : null ,
        // host : 'localhost:8080' ,
        // port : '8080' ,
        // hostname : 'localhost' ,
        // hash : null ,
        // search : '?a=index&t=article',
        // query : 'a=index&t=article',
        // pathname : '/one',
        // path : '/one?a=index&t=article',
        // href : 'http://localhost:8080/one?a=index&t=article'


        // option =config jwt =writerList
        if (options.includes(url.parse(ctx.url).pathname)) {
            await next()
            return
        }

        let token = ctx.get("token")

        if (!token) {
            ctx.body = { code: 1, msg: "没有访问权限,请去登录" }
            return
        }

        let info
        try {
            info = await verifyFunc(token, ctx)
        } catch (err) {
            ctx.body = { code: 1, msg: "权限无效,重新登录" }
            return
        }
        //吧 解出来的token 挂在到全局
        ctx.info = info
        await next()
    }

}
// function PoJie(ctx, token) {
//     return new Promise(res => {
//         jwt.verify(token, ctx.app.config.keys, (err, result) => {
//             if (err) throw err
//             res(result)
//         })
//     })
// }
// module.exports = options => {
//     return async (ctx, next) => {
//         if (options.includes(url.parse(ctx.url).pathname)) {
//             next();
//             return
//         }
//         let token = localStorage.getItem("token");
//         if (!token) {
//             ctx.body = { code: 1, msg: "无权限访问,请登入" }
//             return
//         }
//         let info
//         try {
//             info = await PoJie(ctx, token)
//         } catch (err) {
//             ctx.body = { code: 1, msg: "访问无效,请登录" }
//         }
//         ctx.info = info;
//         await next();
//     }
// }
