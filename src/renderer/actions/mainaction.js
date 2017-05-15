const {ipcRenderer} = require('electron')
import * as IPCMESSAGE from '../../constipc'

export const mainActions = {
    list(){
        return dispatch => {
            dispatch({
                type: 'LIST_WORK'
            })
            ipcRenderer.once(IPCMESSAGE.FILEINFO_LIST, (event, args) => {
                dispatch({
                    payload: args,
                    type: 'LIST'
                })
            })
            ipcRenderer.send(IPCMESSAGE.FILEINFO_LIST)
        }
    },
    delete(ids){
        return dispatch => {
            dispatch({
                type: 'DELETE_WORK'
            })
            ipcRenderer.once(IPCMESSAGE.FILEINFO_DELETE, (event, args) => {
                dispatch({
                    payload: args,
                    type: 'DELETE'
                })
            })
            ipcRenderer.send(IPCMESSAGE.FILEINFO_DELETE, ids);
        }
    },
    copy(){
        ipcRenderer.send(IPCMESSAGE.COPY)
        return {
            type: 'COPY'
        }
    },
    cancelCopy(){
        ipcRenderer.send(IPCMESSAGE.COPY_CANCEL)
        return {
            type: 'COPY_CANCEL'
        }
    },
    getCopy(){
        return dispatch => {
            ipcRenderer.once(IPCMESSAGE.GET_COPY, (event, args) => {
                dispatch({
                    type: 'GET_COPY',
                    payload: args
                })
            });
            ipcRenderer.send(IPCMESSAGE.GET_COPY)
        }
    }
}