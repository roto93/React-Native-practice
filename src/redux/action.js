export const SET_SHOW_POKE_MODAL = 'SET_SHOW_POKE_MODAL'
export const SET_ID_SAVED = 'SET_ID_SAVED'

export function setShowPokeModal(bool) {
    return {
        type: SET_SHOW_POKE_MODAL,
        payload: { showPokeModal: bool }
    }
}

export function setIdSaved(arr) {
    return {
        type: SET_ID_SAVED,
        payload: { idSaved: { list: arr } }
    }
}