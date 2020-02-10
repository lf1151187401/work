import axios from "axios"
export default function http(method, url, data = []) {
    let configData = {

    };
    configData.method = method;
    let type = method === "get" ? "params" : "data";
    configData.url = url;
    configData[type] = data;
    configData.header = {
        token: localStorage.getItem("token")
    }
    return axios(configData).catch(err => {
        if (err.response.status === 404) {
            alert("接口")
            return
        }
        if (err.response.status === 500) {
            alert("接口")
            return
        }
    })
}