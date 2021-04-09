import React, { useEffect, useState, memo } from 'react'
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image, ActivityIndicator, useWindowDimensions } from 'react-native'
import PokeModal from '../component/PokeModal'
import * as pokeFunc from '../component/pokeFunc'
import { useDispatch, useMappedState } from 'redux-react-hook'
import * as Action from '../redux/action'
import * as Storage from '../../StorageHelper'
import MDicon from 'react-native-vector-icons/MaterialIcons'


export default function PokeList(props) {
    const winX = useWindowDimensions().width
    const [displayFrom, setDisplayFrom] = useState(0);
    const [listURI, setListURI] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [pokeList, setPokeList] = useState({}); //
    const [loading, setLoading] = useState(true);
    const [pokeDetail, setPokeDetail] = useState([]);
    const [pokeModalID, setpokeModalID] = useState(0);
    const [idSaved, setIdSaved] = useState({ list: [] });

    const dispatch = useDispatch()
    const showPokeModal = useMappedState(state => state.showPokeModalReducer.showPokeModal)
    const setShowPokeModal = (bool) => { dispatch(Action.setShowPokeModal(bool)) }
    const setID = (obj) => { Storage.setMySetting('myPokemon', JSON.stringify(obj)) }
    const getID = async () => {
        let myPokemonID = await Storage.getMySetting('myPokemon')
        myPokemonID = JSON.parse(myPokemonID)
        setIdSaved(myPokemonID)
    }
    const myAbortController = new AbortController();
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
        // return () => {
        //     myAbortController.abort()
        // }
    }, [listURI])

    const RenderData = memo(({ item, index }) => {
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
                delayPressIn={0}
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
                            resizeMethod={'resize'}
                            style={{ width: 80, height: 80 }} />
                    </View>
                </View>

            </TouchableOpacity>

        )
    })
    const btnSize = winX * 0.18
    return (
        <View style={styles.container}>
            <View style={{ height: '75%', width: '100%', alignItems: 'center', borderTopWidth: 2, borderBottomWidth: 2, justifyContent: 'center' }}>
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

            <TouchableOpacity style={styles.TO} onPress={() => { setID({ list: [] }); setIdSaved({ list: [] }) }}>
                <Text style={styles.t_TO}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TO} onPress={() => { props.navigation.navigate('MyPokemon') }}>
                <Text style={styles.t_TO}>See My Pokemon</Text>
            </TouchableOpacity>

            {loading || <PokeModal isVisible={showPokeModal} onDismiss={setShowPokeModal} pokeInfo={pokeDetail[pokeModalID]} pokeID={displayFrom + pokeModalID} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    card_view: {
        // borderWidth: 1,
        // width: 'inline'
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
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D1F5FF',
        marginTop: 8,
        elevation: 1,

    },
    t_TO: {
        fontSize: 16,
    }
})
