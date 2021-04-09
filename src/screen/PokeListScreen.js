import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, useWindowDimensions } from 'react-native'
import * as Action from '../redux/action'
import { useDispatch } from 'redux-react-hook'
import * as Storage from '../../StorageHelper'
import MDicon from 'react-native-vector-icons/MaterialIcons'
import PokeModal from '../component/PokeModal'
import * as pokeFunc from '../component/pokeFunc'


export default function PokeList(props) {
    const winX = useWindowDimensions().width //手機畫面的寬
    const [listURI, setListURI] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [pokeList, setPokeList] = useState({}); //取得列表 一次20個
    const [displayFrom, setDisplayFrom] = useState(0); //這組列表是從編號第幾號開始抓20隻?
    const [loading, setLoading] = useState(true); //讀取中
    const [pokeDetail, setPokeDetail] = useState([]); //每隻神奇寶貝的資料
    const [pokeModalID, setpokeModalID] = useState(0); //開啟modal時，要傳入的神奇寶貝編號
    const [idSaved, setIdSaved] = useState({ list: [] }); //儲存已收藏的編號，結構選用物件可以確保即使陣列為空時也不會回傳false

    const dispatch = useDispatch()
    const setShowPokeModal = (bool) => { dispatch(Action.setShowPokeModal(bool)) }
    const setID = (obj) => { Storage.setMySetting('myPokemon', JSON.stringify(obj)) }
    const getID = async () => {
        let myPokemonID = JSON.parse(await Storage.getMySetting('myPokemon'))
        setIdSaved(myPokemonID)
    }
    const fetchPokeList = async () => {
        try {
            setLoading(true)
            let POKE_DATA = await fetch(listURI).then(res => res.json()).catch((e) => { console.log('fetch list error: ' + e) })
            setPokeList(POKE_DATA)
            let _pokeDetail = await Promise.all(
                POKE_DATA.results.map(async (pokemon) => {
                    return await fetch(pokemon.url).then(res => res.json()).catch(e => { console.log('fetch url error: ' + e) })
                })
            )
            setPokeDetail(_pokeDetail)
            await getID()
            setLoading(false)
        } catch (e) { console.log('fetchPokeList error: ' + e) }
    }
    useEffect(() => {
        fetchPokeList()
    }, [listURI])

    const RenderData = ({ item, index }) => {
        let pokemonId = displayFrom + index + 1
        const onPokemonPress = () => {
            let arr = [...idSaved.list]
            if (arr.includes(pokemonId)) {
                let pos = arr.indexOf(pokemonId)
                arr.splice(pos, 1)
            }
            else { arr.push(pokemonId) }
            setIdSaved({ list: arr }) // 如果state是object，可以用updater function，或是在setState()之外先定義好object的模樣再傳進去，盡量不要用state做物件運算
            setID({ list: arr }) // 存到AsyncStorage
        }

        return (
            <TouchableOpacity
                style={[styles.card_view, { width: winX * 0.65, backgroundColor: idSaved.list.includes(pokemonId) ? '#E1E3FF' : '#D1F5FF' }]}
                onLongPress={() => { setpokeModalID(index), setShowPokeModal(true) }}
                onPress={onPokemonPress}
            >
                <View style={styles.row_between} >
                    <View style={styles.info_box}>
                        <Text>{pokemonId + '. ' + pokeDetail[index].name}</Text>
                        {pokeDetail[index].types.map((a, i) =>
                            <View key={i} style={[styles.type_box, { backgroundColor: pokeFunc.getTypeColor(a.type.name).bgc }]}>
                                <Text style={{ color: pokeFunc.getTypeColor(a.type.name).tcolor }}>
                                    {a.type.name}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.img_box}>
                        <Image source={{ uri: pokeDetail[index].sprites.front_default }}
                            style={{ width: 80, height: 80 }} />
                    </View>
                </View>

            </TouchableOpacity>

        )
    }
    const btnSize = winX * 0.18
    return (
        <View style={styles.container}>
            <View style={styles.loading_view}>
                {loading ?
                    <ActivityIndicator color={'gray'} size={60} />
                    :
                    <View style={{ flexDirection: 'row', height: '100%' }}>
                        <TouchableOpacity
                            style={[styles.change_page_btn, { width: btnSize }]}
                            onPress={() => { if (pokeList.previous == null) { } else setDisplayFrom(displayFrom - 20), setListURI(pokeList.previous) }}>
                            <MDicon name={'keyboard-arrow-left'} size={50} />
                        </TouchableOpacity>
                        <View style={{ width: winX * 0.64 }}>
                            <FlatList
                                data={pokeList.results}
                                renderItem={(cases) => { return <RenderData item={cases.item} index={cases.index} /> }}
                                keyExtractor={(cases, index) => { return index.toString() }}
                                contentContainerStyle={{ alignItems: 'center', }} />
                        </View>
                        <TouchableOpacity
                            style={[styles.change_page_btn, { width: btnSize }]}
                            onPress={() => { if (pokeList.next == null) { } else setDisplayFrom(displayFrom + 20), setListURI(pokeList.next) }}>
                            <MDicon name={'keyboard-arrow-right'} size={50} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View style={styles.row_btn}>
                <TouchableOpacity style={styles.TO} onPress={() => { setID({ list: [] }); setIdSaved({ list: [] }) }}>
                    <Text style={styles.t_TO}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TO} onPress={() => { props.navigation.navigate('MyPokemon') }}>
                    <Text style={styles.t_TO}>See My Pokemon</Text>
                </TouchableOpacity>
            </View>

            {loading || <PokeModal pokeInfo={pokeDetail[pokeModalID]} pokeID={displayFrom + pokeModalID} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loading_view: {
        height: '75%',
        width: '100%',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        justifyContent: 'center'
    },
    card_view: {
        // borderWidth: 1,
        height: 80,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#D1F5FF',
        elevation: 2
    },
    row_between: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row_btn: {
        width: '80%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info_box: {
        // borderWidth: 1,
        width: 100,
        alignItems: 'flex-start'
    },
    img_box: {
        // borderWidth: 1,
        justifyContent: 'center',
    },
    type_box: {
        // borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginTop: 4,
    },
    change_page_btn: {
        // borderWidth: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TO: {
        // borderWidth: 1,
        borderRadius: 8,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
        marginTop: 8,
        elevation: 1,

    },
    t_TO: {
        fontSize: 16,
        textAlign: 'center',
    }
})
