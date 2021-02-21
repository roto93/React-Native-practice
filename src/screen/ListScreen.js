import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // react-native 裡的 SafeAreaView 沒作用，必須用這個
import HORO_DATA from '../components/HORO_DATA'
import Modal from 'react-native-modal'
import { PanResponder } from 'react-native-reanimated'

function ListScreen(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalCase, setModalCase] = useState({});

    const renderData = (item) => {
        return (
            <TouchableOpacity
                style={styles.itemBox}
                delayPressIn={25}
                onPress={() => { props.navigation.navigate('ListStack', { horoCase: item }) }}
                onLongPress={(evt) => { setShowModal(true), setModalCase(item) }}
                delayLongPress={150}
                onPressOut={() => { setShowModal(false) }}
            >
                <View style={styles.rowBox}>
                    <View style={styles.shadow}>
                        <Image source={item.image} style={styles.itemImage} />
                    </View>
                    <View>
                        <View style={styles.titleBox}>
                            <Text style={styles.ChineseTitle}>{item.HoroNameCH}  </Text>
                            <Text style={styles.title}>{item.HoroName}</Text>
                        </View>
                        <Text
                            numberOfLines={2}
                            style={styles.discription}
                        >{item.discription}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.headerBox}>
                <Text style={styles.t_title} >十二星座</Text>
            </View> */}
            <View style={styles.FlatListContainer}>
                <FlatList
                    data={HORO_DATA}
                    renderItem={cases => renderData(cases.item)}
                    keyExtractor={cases => cases.id}
                />
            </View>
            <Modal
                isVisible={showModal}
                hideModalContentWhileAnimating={true}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                animationOutTiming={300}
                onBackButtonPress={() => { setShowModal(false) }}       // 按手機的返回鍵時要執行的動作
                useNativeDriver={true}                    //沒設定這個的話動畫會卡卡的
                onBackdropPress={() => { setShowModal(false) }}         // 按視窗外的區域要執行的動作
            >
                <View style={styles.modal_container} pointerEvents={'box-only'}
                >
                    <View style={styles.modal_shadow}>
                        <Image style={styles.modal_horoImg} source={modalCase.image} />
                    </View>
                    <Text style={styles.modal_horoNameCH}>{modalCase.HoroNameCH}</Text>
                    <Text style={styles.modal_horoName}>{modalCase.HoroName}</Text>
                    <Text style={styles.modal_discription}>{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{modalCase.discription}</Text>
                </View>
            </Modal>
        </View >
    );
}

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    FlatListContainer: {
        // borderWidth: 1,
        width: '90%',
        height: '98%',
    },
    headerBox: {
        // borderWidth: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9EB7E5',
        elevation: 3,
    },
    itemBox: {
        // borderWidth: 1,
        width: 300,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: '#DCE5F9',
        alignSelf: 'center',
        elevation: 1,
    },
    itemImage: {
        width: 72,
        height: 72,
    },
    rowBox: {
        flexDirection: 'row',
    },
    titleBox: {
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 26,
        marginBottom: 4,
    },
    ChineseTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    discription: {
        width: 192,
        color: 'dimgray'
    },
    t_title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 16,
    },
    shadow: {
        // borderWidth: 1,
        elevation: 1,
        marginRight: 10,
        backgroundColor: '#9EB7E5'
    },




    modal_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCE5F9',
        borderRadius: 24,
    },
    modal_horoImg: {
        width: 150,
        height: 150,
    },
    modal_horoNameCH: {
        // borderWidth: 1,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    modal_horoName: {
        // borderWidth: 1,
        fontSize: 20,
        fontWeight: '600',
        marginTop: 12,
        textAlign: 'center',
        color: '#9BBFB3'
    },
    modal_discription: {
        // borderWidth: 1,
        fontSize: 16,
        width: '80%',
        marginTop: 12,
        lineHeight: 36,
    },
    modal_shadow: {
        // borderWidth: 1,
        elevation: 3,
        backgroundColor: '#9EB7E5'
    }

})