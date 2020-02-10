import Login from "../views/login"
let Routers = [
    {
        path: "/login",
        component: Login
    }, {
        path: "/",
        redirect: "/login"
    }
]
export default Routers