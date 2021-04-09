//Hw 8

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Hw8() {
    return (
        <View style={styles.container}>
            <Text>Hi React Native</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
