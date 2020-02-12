import Login from "../View/Login"
import Home from "../View/home"
import Ticket from "../View/ticket"
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
        path:"/ticket",
        component:Ticket
    },
    {
        path: "/",
        redirect: "/login"
    }
]
export default Routers