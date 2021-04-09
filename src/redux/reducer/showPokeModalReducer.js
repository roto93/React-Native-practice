import * as Action from '../action'

export default function showPokeModalReducer(state = { showPokeModal: false }, action) {
    switch (action.type) {
        case Action.SET_SHOW_POKE_MODAL:
            return {
                ...state,
                showPokeModal: action.payload.showPokeModal
            }
        default:
            return state
    }
}