import React from 'react';
import { combineReducers } from 'redux'
import showPokeModalReducer from './showPokeModalReducer'
import idSavedReducer from './idSavedReducer'

export const rootReducer = combineReducers({
    showPokeModalReducer,
    idSavedReducer,
})