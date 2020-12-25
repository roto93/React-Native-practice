// 作業3
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';

export default function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const log_in_btn_clicked = () => {
        username == 'hoho123180' & password == 12345678 ? setMessage('登入成功!') : setMessage('登入失敗')
    }

    const forget_btn = () => {
        username != 'hoho123180' | password != 12345678 && setMessage('我也沒辦法!')
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <Text style={[styles.def_text, { fontSize: 30, transform: [{ translateY: 200 }] }]}>{message}</Text>

            <Image source={require('./src/image/pun1.png')} style={styles.login_img} />

            <View style={styles.wrapping}>
                <Text style={styles.def_text}>登入帳號</Text>
                <View style={{ height: 1, width: '100%', marginBottom: 12, backgroundColor: 'white' }}></View>
                <Text style={styles.def_text}>帳號</Text>
                <TextInput
                    // placeholder={'Username'}
                    maxLength={10}
                    keyboardType='email-address'
                    style={styles.TInput}
                    onChangeText={(text1) => setUsername(text1)}
                    value={username}
                />

                <Text style={styles.def_text}>密碼</Text>

                <TextInput
                    style={styles.TInput}
                    // placeholder={'Password'}
                    maxLength={8}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    onChangeText={(text2) => setPassword(text2)}
                    onPress={() => setPassword('')}
                    value={password}
                />

                <TouchableOpacity
                    delayPressIn={0}
                    style={styles.login_btn}
                    onPress={() => log_in_btn_clicked()}>
                    <Text style={[styles.def_text, { fontSize: 16, marginBottom: 0 }]}>登入</Text>
                </TouchableOpacity>

                <View style={[styles.center_view, { marginBottom: 20 }]}>
                    <Text style={[styles.p1]} onPress={() => forget_btn()}>忘記密碼</Text>
                </View>
            </View>
            <Text style={[styles.def_text, { fontSize: 30, position: 'absolute', transform: [{ translateY: 200 }] }]}>{message}</Text>

            <StatusBar style="auto" />
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    wrapping: {
        backgroundColor: '#1A1C20',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        paddingVertical: 10,
        transform: [{ translateY: 170 }]

    },

    center_view: {
        width: '100%',
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    TInput: {
        width: '100%',
        height: 32,
        fontSize: 22,
        borderRadius: 2,
        backgroundColor: 'darkgray',
        opacity: 1,
        textAlign: 'center',
        marginBottom: 11,
    },

    def_text: {
        color: 'white',
        fontSize: 15,
        marginBottom: 11,
    },

    p1: {
        color: 'white',
        fontSize: 13,
        marginBottom: 11,
        position: 'absolute'
    },

    login_btn: {
        width: '100%',
        height: 32,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF414D',
        marginVertical: 10,
    },

    login_img: {
        width: 150,
        height: 150,
        position: 'absolute',
        transform: [{ translateY: 50 }]
    }


})