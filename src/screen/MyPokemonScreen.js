import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { useDispatch, useMappedState } from 'redux-react-hook'
import * as Action from '../redux/action'
import * as Storage from '../../StorageHelper'

export default function MyPokemonScreen() {
    const [idSaved, setIdSaved] = useState({ list: [] });
    const [loading, setLoading] = useState(true);
    const [pokeDetail, setPokeDetail] = useState({});

    const load = async () => {
        let myPokemonID
        const getID = async () => {
            myPokemonID = await Storage.getMySetting('myPokemon')
            myPokemonID = JSON.parse(myPokemonID)
            setIdSaved(myPokemonID)
            // idSaved在第一次渲染後才會變成從Storage讀取到的值
        }
        if (!loading) setLoading(true)

        try {
            console.log('start load')
            await getID()
            // await fetchPokemon(idSaved.list)
            const _pokeDetail = await Promise.all(
                myPokemonID.list.map(async (id) => {
                    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()).catch(e => { console.log(e) })
                }),
            )
            setPokeDetail(_pokeDetail)
            console.log('finish load')
        } catch (e) { console.log('fetchPokeList error: ' + e) }
        setLoading(false)
    }
    useEffect(() => {

        load()
    }, [])

    const renderPokemon = ({ item, index }) => {
        return (
            <View style={styles.pokemon_view}>
                <Image
                    source={{ uri: item.sprites.front_default }}
                    resizeMethod={'resize'}
                    style={{ width: 80, height: 80 }}
                />
                <Text>{item.name}</Text>
            </View>
        )
    }

    if (loading) return (<ActivityIndicator color={'gray'} size={60} />)
    return (
        <View style={styles.container}>
            <View style={styles.poke_container}>
                <FlatList
                    data={pokeDetail}
                    renderItem={(cases) => renderPokemon(cases)}
                    keyExtractor={(cases, index) => index}
                    numColumns={3}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    poke_container: {
        // borderWidth: 1,
        borderColor: 'tomato',
        width: '90%',
        height: '90%',
        paddingVertical: 20,
    },
    pokemon_view: {
        // borderWidth: 1,
        borderRadius: 4,
        width: 100,
        height: 130,
        marginHorizontal: 4,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dee2ff',
        elevation: 2
    }
})
