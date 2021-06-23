import { combineReducers,createStore,applyMiddleware } from "redux";
import ToDoListReducer from "./ToDoListReducer";
import reduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
    ToDoListReducer
})

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));