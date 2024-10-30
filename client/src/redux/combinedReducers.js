import { combineReducers } from "@reduxjs/toolkit";
import { reducers } from "./generalSlice";

const rootReducer = combineReducers({
    general : reducers.generalSlice
})

export default rootReducer;