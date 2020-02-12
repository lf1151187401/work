import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
let initState = {
    AllData: []
}
function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === "ADD_DATA") {
        console.log(action, "action")
        newState.AllData = action.list;
        console.log(newState.AllData, "AllData")
    }
    return newState
}

let store = createStore(reducer, applyMiddleware(thunk))

export default store