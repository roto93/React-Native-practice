//Hw4 components

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyGoodBtn from './src/components/MyGoodBtn'

function hw4(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>自製按鈕</Text>
            <MyGoodBtn t={'NO.1'} tSize={12} isBorderRadius={true} />
            <MyGoodBtn t={'NO.2'} tSize={20} isBorderRadius={false} />
            <MyGoodBtn t={'NO.3'} tSize={16} isBorderRadius={true} />
            <MyGoodBtn />
        </View>
    );
}

export default hw4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B88A2'
    }
})