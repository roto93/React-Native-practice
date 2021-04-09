//Hw 8

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PokeListScreen from './src/screen/PokeListScreen'
import MyPokemonScreen from './src/screen/MyPokemonScreen'
import store from './src/redux/store'
import { StoreContext, useMappedState, useDispatch } from 'redux-react-hook'

function Hw8() {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'PokeList'} component={PokeListScreen} />
                <Stack.Screen name={'MyPokemon'} component={MyPokemonScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default function App() {
    return (
        <StoreContext.Provider value={store()}>
            <Hw8 />
        </StoreContext.Provider>
    )
}