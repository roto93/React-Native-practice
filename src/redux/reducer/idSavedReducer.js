import * as Action from '../action'

export default function idSavedReducer(state = { idSaved: { list: [] } }, action) {
    switch (action.type) {
        case Action.SET_SHOW_POKE_MODAL:
            return {
                ...state,
                idSaved: { list: action.payload.idSaved }
            }
        default:
            return state
    }
}