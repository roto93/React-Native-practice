import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, Image, FlatList, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

function SettingPage(props) {
    const [rerender, setRerender] = useState(true);
    const [itemName, setItemName] = useState('');
    const [itemArr, setItemArr] = useState([]);
    let localItemArr = itemArr  // 本地的Array, 方便做陣列的運算


    const _renderItem = (item, index) => {
        return (
            <View style={[styles.rowBox, { borderWidth: 0 }]}>
                <View style={styles.itemBox} onTouchStart={() => { console.log(index) }}>
                    <Text style={{ fontSize: 20 }}>{item.item}</Text>
                </View >
                <TouchableOpacity
                    style={styles.del}
                    delayPressIn={0}
                    onPress={() => {
                        localItemArr.splice(index, 1) // 從 index 的位置刪掉一個元素
                        localItemArr.map((val, index) => { val.id = index.toString() })  // 保持 id 的順序
                        setItemArr(localItemArr)  // 存到 ItemArr 這個 state 中，但不知為何沒觸發 rerender
                        setRerender(-rerender)  // 隨便改變一個 State 來觸發 rerender
                    }}
                >
                    <Ionicons name={'md-close'} size={30} />
                </TouchableOpacity>
            </View >
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.addNew}>新 增 選 項</Text>
            <View style={styles.rowBox}>
                <TextInput
                    style={styles.tInput}
                    maxLength={10}
                    onChangeText={(text) => { setItemName(text) }}
                    value={itemName}
                />
                <TouchableOpacity
                    style={styles.TO}
                    delayPressIn={0}
                    onPress={() => {
                        if (itemName != '') {
                            localItemArr.unshift({ id: (localItemArr.length).toString(), item: itemName }) //在localItemArr的最前面新增一個物件
                            setItemArr(localItemArr)  // 存到 state 中
                            setItemName('')   // 重置輸入格
                        }
                    }}
                >
                    <Text>新增</Text>
                </TouchableOpacity>
            </View>


            {/* 在 FlatList 外面包一個 View，來控制 FlatList 的大小 */}
            <View style={{ height: 360, borderRadius: 8 }}>
                <FlatList
                    style={styles.flatlist}
                    data={localItemArr}
                    renderItem={cases => _renderItem(cases.item, cases.index)}
                />
            </View>

            {/* {
                // 不知道為什麼為什麼這裡不能在其他地方用 const function....來定義?
                itemArr.map((value, index) => {
                    return (
                        <Text key={index}>{value.id}</Text>
                    )
                })
            } */}

            <TouchableOpacity
                style={styles.btn}
                delayPressIn={0}
                onPress={() => { props.navigation.navigate('Answer', { choices: localItemArr }) }}
            >
                <Text>幫我選一個！</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default SettingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#FFE9F3'
    },
    addNew: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
        marginBottom: 8
    }
    ,
    rowBox: {
        // borderWidth: 1,
        width: 300,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 16

    },
    tInput: {
        backgroundColor: '#fff',
        width: 200,
        height: 50,
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: 'darkgray',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    TO: {
        backgroundColor: '#fff',
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'darkgray',
        borderWidth: 1,
        borderRadius: 8,
    },
    itemBox: {
        // borderWidth: 1,
        width: 180,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        borderRadius: 22,
        backgroundColor: '#F4BFDB'
    },
    del: {
        // borderWidth: 1,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#D3D4D9'
    },
    flatlist: {
    },
    btn: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    }

})


