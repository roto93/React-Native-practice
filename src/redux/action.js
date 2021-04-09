export const SET_SHOW_POKE_MODAL = 'SET_SHOW_POKE_MODAL'

export function setShowPokeModal(bool) {
    return {
        type: SET_SHOW_POKE_MODAL,
        payload: { showPokeModal: bool }
    }
}