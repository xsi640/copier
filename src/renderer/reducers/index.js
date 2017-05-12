import FileModalReducer from './filemodalreducer'
import MainReducer from './mainreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    FileModalReducer,
    MainReducer
})