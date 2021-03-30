import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types'

function MyGoodBtn(props) {
    const colorArray = ['#512D38', '#F4BFDB', '#87BAAB']
    const [colorIndex, setColorIndex] = useState(0);

    const changeColor = () => {
        if (colorIndex == 2) { setColorIndex(0) }
        else setColorIndex(colorIndex + 1)
    }

    return (
        <TouchableOpacity
            style={[styles.box, { borderColor: colorArray[colorIndex], borderRadius: props.isBorderRadius ? 8 : 0 }]}
            delayPressIn={0}
            onPress={() => { changeColor() }}
        >
            <Text style={[styles.text, { color: colorArray[colorIndex], fontSize: props.tSize }]}>{props.t}</Text>
        </TouchableOpacity>
    );
}

export default MyGoodBtn;

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 40,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 16,
    }
})

MyGoodBtn.propTypes = {
    t: PropTypes.string,
    tSize: PropTypes.number,
    isBorderRadius: PropTypes.bool,
}
MyGoodBtn.defaultProps = {
    t: 'Button',
    tSize: 16,
    isBorderRadius: false,
}