export default function fileInfoReducer(state, action) {
    if (typeof state === 'undefined')
        return {showFileInfo: false};

    switch (action.type) {
        case "SAVE_WORKING":
            return {...state, loading: true}
        case "SAVE":
            if (typeof action.payload.error === 'undefined') {
                return {...state, ...action.payload.data, loading: false, showFileInfo: false};
            } else {
                return {...state, error: action.payload.error, loading: false};
            }
        case "LOAD":
            return {...state, ...action.payload.data};
        case "CHANGE_PROPS":
            return {...state, ...action.payload};
        default:
            return state;
    }
}