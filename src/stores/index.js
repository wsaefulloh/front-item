import {createStore, combineReducers} from "redux"
import users from "./reducers/users.js"
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeL2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducer = combineReducers({
    users,
})

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeL2,
}

const rootReducer = (state, action) => {
    if (action.type === "UNSET_AUTH") {
        state = undefined
    }
    return reducer(state, action)
}

const persistReduser = persistReducer(persistConfig, rootReducer)
const configStore = () => createStore(persistReduser)

export default configStore