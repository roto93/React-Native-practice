// hw5 Navigation

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BirthdayPage from './src/screen/BirthdayPage'
import HoroscopePage from './src/screen/HoroscopePage'
import SettingPage from './src/screen/SettingPage'
import AnswerPage from './src/screen/AnswerPage'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function App() {

    const Tab = createBottomTabNavigator()
    const Stack = createStackNavigator()

    const BirthdayStackPage = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen component={BirthdayPage} name={'Birthday'}
                    options={{ title: '星座判斷器', headerTitleAlign: 'center' }}
                />
                <Stack.Screen component={HoroscopePage} name={'Horoscope'}
                    options={{ title: '星座判斷器', headerTitleAlign: 'center' }}
                />
            </Stack.Navigator>
        )
    }

    const ChoicePage = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen component={SettingPage} name={'Setting'}
                    options={{ title: '選擇障礙小幫手', headerTitleAlign: 'center' }} />
                <Stack.Screen component={AnswerPage} name={'Answer'}
                    options={{ title: 'Here\'s your 選擇', headerTitleAlign: 'center' }} />
            </Stack.Navigator>
        )
    }


    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{ labelStyle: { fontSize: 12 } }}>
                <Tab.Screen component={BirthdayStackPage} name={'BirthdayStack'}
                    options={{
                        tabBarIcon: ({ color }) => (<Ionicons name={'md-planet'} size={30} color={color} />),
                        tabBarLabel: '星座',

                    }}
                />
                <Tab.Screen component={ChoicePage} name={'Choice'}
                    options={{
                        tabBarIcon: ({ color }) => (<Ionicons name={'md-infinite'} size={30} color={color} />),
                        tabBarLabel: '選擇障礙',
                    }}
                />
            </Tab.Navigator>
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
})