import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

function AnswerPage(props) {
    let A = Math.round(Math.random() * 100)
    let ans = props.route.params.choices[A % props.route.params.choices.length].item

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img} source={require('../image/Your_Choice.png')} />
            <Text style={styles.t}>{ans}</Text>
        </SafeAreaView>
    );
}

export default AnswerPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        position: 'absolute',
        width: 350,
        height: 450
    },
    t: {
        backgroundColor: '#fff',
        width: 40,
        textAlign: 'center',
        fontSize: 15

    }

})