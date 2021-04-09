import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import * as pokeFunc from '../component/pokeFunc'


export default function PokeModal(props) {
    let showPokeModal = props.isVisible

    return (
        <Modal
            isVisible={showPokeModal}
            useNativeDriver={true}
            onBackdropPress={() => { props.onDismiss(false) }}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            style={{ alignItems: 'center' }}
        >
            <View style={styles.modal_view}  >
                <Image source={{ uri: `https://pokeres.bastionbot.org/images/pokemon/${props.pokeID + 1}.png` }} style={{ width: 150, height: 150, }} />
                <Text style={styles.t_name}>{props.pokeInfo.name}</Text>
                <View style={{ flexDirection: 'row', width: 150, justifyContent: props.pokeInfo.types.length == 1 ? 'center' : 'space-between', marginVertical: 20, }}>
                    {props.pokeInfo.types.map((slot, i) =>
                        <View key={i} style={[styles.type_box, { backgroundColor: pokeFunc.getTypeColor(slot.type.name).bgc }]}>
                            <Text style={{ color: pokeFunc.getTypeColor(slot.type.name).tcolor }}>
                                {slot.type.name}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={styles.t}>Weight: {props.pokeInfo.weight / 10}kg</Text>
                <Text style={styles.t}>Height: {props.pokeInfo.height / 10}m</Text>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    modal_view: {
        width: 250,
        height: 400,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 8,
    },
    t_name: {
        fontSize: 24,
        marginTop: 12,
    },
    type_box: {
        // borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 4,
    },
    t: {
        fontSize: 16,
    }
})
