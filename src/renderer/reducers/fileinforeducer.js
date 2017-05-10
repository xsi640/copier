export default function fileInfoReducer(state, action) {
    if (typeof state === 'undefined')
        return {};

    switch (action.type) {
        case "CHANGE_PROPS":
            return {...state, ...action.payload};
        case "BROWSE":
            if (typeof action.payload.source === 'undefined' &&
                typeof action.payload.target === 'undefined')
                return {...state};
            else
                return {...state, ...action.payload};
        default:
            return state;
    }
}