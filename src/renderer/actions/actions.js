const {ipcRenderer} = require('electron')

export const actions = {
    copy(source, target, ignore){
        return dispatch => {
            ipcRenderer.once('COPY', (event, arg) => {

            })
            ipcRenderer.send('COPY', {
                source,
                target,
                ignore
            })
        }
    },
    changeProps(props){
        return {
            type: 'CHANGE_PROPS',
            payload: props
        }
    },
    browseFolder(name){
        return dispatch => {
            ipcRenderer.once('BROWSE', (event, args) => {
                dispatch({
                    type: 'BROWSE',
                    payload: {[name]: args}
                })
            })
            ipcRenderer.send('BROWSE')
        }
    }
}