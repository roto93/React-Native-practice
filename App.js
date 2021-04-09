//Hw 8

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StoreContext } from 'redux-react-hook'
import PokeListScreen from './src/screen/PokeListScreen'
import MyPokemonScreen from './src/screen/MyPokemonScreen'
import store from './src/redux/store'


export default function Hw8() {
    const Stack = createStackNavigator()
    return (
        <StoreContext.Provider value={store()}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'PokeList'} component={PokeListScreen} />
                    <Stack.Screen name={'MyPokemon'} component={MyPokemonScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreContext.Provider>
    )
}
