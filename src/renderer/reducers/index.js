import FileInfoReducer from './fileinforeducer'
import MainReducer from './mainreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    FileInfoReducer,
    MainReducer
})