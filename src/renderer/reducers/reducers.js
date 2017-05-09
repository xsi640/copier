export function reducer(state, action) {
    if (typeof state === 'undefined')
        return {source: '', target: ''};

    switch (action.type) {
        case "COPY":
            return Object.assign({}, state, action.payload);
        case "CHANGE_PROPS":
            return Object.assign({}, state, action.payload);
        case "BROWSE":
            if (typeof action.payload.source === 'undefined' &&
                typeof action.payload.target === 'undefined')
                return Object.assign({}, state);
            else
                return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}