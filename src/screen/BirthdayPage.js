import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

function BirthdayPage(props) {
    const [birthday, setBirthday] = useState('');

    // 檢查日期
    const checkDate = (input) => {
        if (input.length != 4 | input[0] + input[1] == '00') {   //如果長度不為4或前兩個字串都是零的話，報錯
            alert('請輸入正確的日期')
            return (false)
        }
        else {
            let d = input
            if (d[0] == '0') { d = eval(d.slice(1)) }  //如果第一個字串是0，切掉第一個字串後轉成number
            else { d = eval(d) }  //否則，把整個字串轉成number

            // 有效日期判斷
            if (
                (d >= 101 & d <= 131) | (d >= 201 & d <= 229) | (d >= 301 & d <= 331) |
                (d >= 401 & d <= 430) | (d >= 501 & d <= 531) | (d >= 601 & d <= 630) |
                (d >= 701 & d <= 731) | (d >= 801 & d <= 831) | (d >= 901 & d <= 930) |
                (d >= 1001 & d <= 1031) | (d >= 1101 & d <= 1130) | (d >= 1201 & d <= 1231)
            ) { return true }
            else {
                alert('請輸入正確的日期')
                return false
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.bgcImg} source={require('../image/star-trails.jpg')} />
            <View style={styles.horizontalView}>
                <Text style={styles.t}>輸入生日：</Text>
                <TextInput
                    style={styles.tInput}
                    keyboardType={'numeric'}
                    placeholder={'ex. 0325'}
                    maxLength={4}
                    onChangeText={(text) => { setBirthday(text) }}
                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                delayPressIn={0}
                onPressIn={() => { checkDate(birthday) ? props.navigation.navigate('Horoscope', { date: birthday }) : {} }}
            >
                <Text style={styles.t}>我的星座是?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default BirthdayPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgcImg: {
        height: '100%',
        opacity: 0.5,
        position: 'absolute'
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    t: {
        fontSize: 16,
    },
    tInput: {
        borderWidth: 1,
        width: 150,
        height: 40,
        padding: 8,
        backgroundColor: '#D3D4D9',
        borderRadius: 4,
        borderColor: 'gray',
    },
    btn: {
        borderWidth: 1,
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#fff'
    },
})