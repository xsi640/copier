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
        return dispatch => {
            function listen(event, args) {
                if(args.coping === false){
                    ipcRenderer.removeAllListeners(IPCMESSAGE.COPY)
                }
                dispatch({
                    type: 'COPY',
                    payload: args,
                })
            }
            ipcRenderer.on(IPCMESSAGE.COPY, listen)
            ipcRenderer.send(IPCMESSAGE.COPY)
        }
    },
    cancelCopy(){

    }
}