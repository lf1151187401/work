//axios 二次封装
import axios from "axios"
export function http(method, url, data = []) {
    let configData = {};
    let type = method === "get" ? "params" : "data";
    configData.method = method;
    configData.url = url;
    configData[type] = data;
    configData.headers = {
        token: localStorage.getItem("token")
    }
    return axios(configData).catch(err => {
        if (err.response.status === 404) {
            alert("接口错误")
            return
        }
        if (err.response.status === 500) {
            alert("服务器错误")
            return
        }
    })
}