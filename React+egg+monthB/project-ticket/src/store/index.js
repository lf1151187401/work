import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
let initState = {
    AllData: [],
    titleDATA: [],
    DaanData: []
}
function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state));



    // 投票列表数据
    if (action.type === "ADD_DATA") {
        console.log(action, "action")
        newState.AllData = action.list;
        console.log(newState.AllData, "AllData")
    }
    if (action.type === "ADD_TOW_DATA") {
        newState.titleDATA = action.titleData;
        newState.DaanData = action.DaanData;
        console.log(newState.titleDATA, newState.DaanData)
    }
    return newState
}

let store = createStore(reducer, applyMiddleware(thunk))

export default store