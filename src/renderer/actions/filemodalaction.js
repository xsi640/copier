const {ipcRenderer} = require('electron')
import * as IPCMESSAGE from '../../constipc'

export const fileModalActions = {
    browseFolder(name){
        return dispatch => {
            ipcRenderer.once(IPCMESSAGE.BROWSE_FOLDER, (event, args) => {
                dispatch({
                    type: 'BROWSE',
                    payload: {[name]: args.data}
                })
            })
            ipcRenderer.send(IPCMESSAGE.BROWSE_FOLDER)
        }
    },
    save(fileInfo){
        return dispatch => {
            dispatch({
                type: 'SAVE_WORK'
            })
            ipcRenderer.once(IPCMESSAGE.FILEINFO_SAVE, (event, args) => {
                dispatch({
                    type: 'SAVE',
                    payload: args
                })
            })
            ipcRenderer.send(IPCMESSAGE.FILEINFO_SAVE, fileInfo)
        }
    }
}