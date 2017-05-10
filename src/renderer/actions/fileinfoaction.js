const {ipcRenderer} = require('electron')
import * as IPCMESSAGE from '../../constipc'

export const fileInfoAction = {
    changeProps(props){
        return {
            type: 'CHANGE_PROPS',
            payload: props
        }
    },
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
    }
}