import Login from "../View/Login"
import Home from "../View/home"
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
        path: "/",
        redirect: "/login"
    }
]
export default Routers