const {ipcRenderer} = require('electron')
import * as IPCMESSAGE from '../../constipc'

export const mainActions = {
    changeProps(props){
        return {
            type: 'CHANGE_PROPS',
            payload: props
        }
    },
    saveFileInfo(fileInfo){
        return dispatch => {
            dispatch({
                type: 'SAVE_WORKING'
            })
            ipcRenderer.once(IPCMESSAGE.FILEINFO_SAVE, (event, args) => {
                dispatch({
                    payload: args,
                    type: 'SAVE'
                })
            })
            ipcRenderer.send(IPCMESSAGE.FILEINFO_SAVE, fileInfo)
        }
    },
    readFileInfos(){
        return dispatch =>{
            ipcRenderer.once(IPCMESSAGE.FILEINFO_LIST, (event, args)=>{
                dispatch({
                    payload:args,
                    type:'LOAD'
                })
            })
            ipcRenderer.send(IPCMESSAGE.FILEINFO_LIST)
        }
    }
}