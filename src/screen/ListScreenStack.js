import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

function ListScreenStack(props) {
    const cases = props.route.params.horoCase
    return (
        <View style={styles.container}>
            <View style={styles.shadow}>
                <Image style={styles.horoImg} source={cases.image} />
            </View>
            <Text style={styles.horoNameCH}>{cases.HoroNameCH}</Text>
            <Text style={styles.horoName}>{cases.HoroName}</Text>
            <Text style={styles.discription}>{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{cases.discription}</Text>
        </View>
    );
}

export default ListScreenStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horoImg: {
        width: 150,
        height: 150,
    },
    horoNameCH: {
        // borderWidth: 1,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    horoName: {
        // borderWidth: 1,
        fontSize: 20,
        fontWeight: '600',
        marginTop: 12,
        textAlign: 'center',
        color: '#9BBFB3'
    },
    discription: {
        // borderWidth: 1,
        fontSize: 16,
        width: '80%',
        marginTop: 12,
        lineHeight: 36,
    },
    shadow: {
        // borderWidth: 1,
        elevation: 3,
        backgroundColor: '#9EB7E5'
    }
})