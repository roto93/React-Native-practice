// hw6 FlatList

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ListScreen from './src/screen/ListScreen.js'
import ListScreenStack from './src/screen/ListScreenStack'

export default function App() {


    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: true }}>
                <Stack.Screen
                    name={'List'} component={ListScreen}
                    options={{
                        headerStyle: styles.header,
                        headerTitleAlign: 'center',
                        headerTitleStyle: styles.headerTitle,
                        headerTitle: '十二星座'
                    }}
                />
                <Stack.Screen
                    name={'ListStack'} component={ListScreenStack}
                    options={{
                        headerStyle: styles.header,
                        headerTitle: '星座詳情',
                        headerTitleStyle: styles.headerTitle,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE9F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#9EB7E5',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})