import Login from "../View/Login"
import Home from "../View/home"
import Ticket from "../View/ticket"
import xq from "../View/xq"
import Echarts from "../View/Echart"
let Routers = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/ticket",
        component: Ticket
    },
    {
        path: "/xq",
        component: xq
    },
    {
        path: "/echarts",
        component: Echarts
    },
    {
        path: "/",
        redirect: "/login"
    }
]
export default Routers