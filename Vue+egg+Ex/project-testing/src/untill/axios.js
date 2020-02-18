import axios from "axios"
export default function (method, url, data = []) {
    let obj = {
        method, url, headers: {
            Token: localStorage.token ? localStorage.token : "unkown"
        }
    }
    let type = method === "get" ? "params" : "data";
    obj[type] = data;
    return axios(obj).catch(err => {
        if (err.response.state === 400) {
            alert("接口错误!")
            return
        }
        if (err.response.state === 500) {
            alert("服务器错误!")
            return
        }
    })
}