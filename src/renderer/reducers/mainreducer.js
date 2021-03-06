export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'LIST':
            return {...state, ...action.payload, loading: false}
        case 'LIST_WORK':
            return {...state, loading: true}
        case 'DELETE':
            return {...state, deletedId: action.payload.data, loading: false}
        case 'DELETE_WORK':
            return {...state, loading: true}
        case 'COPY':
            return {...state, ...action.payload}
        case 'GET_COPY':
            return {...state, ...action.payload.data}
        default:
            return state;
    }
}