import { useState, useCallback, useEffect } from "react"
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableNativeFeedback, Image, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../../src/server/api";

import Search from "@expo/vector-icons/Ionicons"
import Microphone from "@expo/vector-icons/MaterialCommunityIcons"

import ImageSearch from "../../../src/assets/iconSearch.png"
import ListarFilme from "../../../src/components/ListarFilme";


export default function Busca(){
    const [titulo, setTitulo] = useState("")
    const [filmes, setFilmes] = useState([])

    async function getFilmes(){
        const {data} = await api.get(`search/movie`, {
            params:{
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
                query: titulo,
                page: 1,
            }
        })
        setFilmes(data.results)
     }

     const  renderItem = useCallback(({item}) => (
        <ListarFilme data={item} />
     ),[])

  

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.viewIcon}>
                    <Search name="search" color={"#737373"} size={20} />
                </View>
                <View style={styles.viewInput}>
                    <TextInput style={styles.input}
                        placeholder="Busque por filme, serie , etc"
                        placeholderTextColor={"#737373"}
                        onSubmitEditing={() => getFilmes()}
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                </View>

                <View style={styles.viewIcon}>
                    <TouchableNativeFeedback  onPress={() => {setTitulo(""), setFilmes([])}}>
                        <Microphone name={titulo.length > 0 ? "close" : "microphone"} color={"#737373"} size={22}  />
                    </TouchableNativeFeedback>
                </View>
            </View >

            {filmes.length > 0 ? 
            (
                <View style={styles.viewList}>
                    <FlatList 
                        data={filmes}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        numColumns={3}
                    />
                </View>
            ): 
            (
                    <View style={styles.viewImage}>
                        <Image resizeMode="contain" style={styles.img} source={ImageSearch} />
                        <Text style={styles.textTitulo}>Inicie uma pesquisa</Text>
                        <Text style={styles.textFrase}>procure por titulos evitando usar acentos ou caracteres especiais como traço e virgulas.</Text>
                    </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    header: {
        backgroundColor: "#333333",
        height: 60,
        flexDirection: "row"
    },
    viewIcon: {
        width: "14%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    viewInput: {
        width: "72%",
        height: "100%",
        justifyContent: "center",
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: "#FFF"
    },

    viewImage: {
        flex: 1,
        marginHorizontal: 40,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    img: {
        height: 180
    },
    textTitulo: {
        color: "#FFF",
        fontWeight: "900",
        fontSize: 18, 
    },
    textFrase: {
        color: "#FFF",
        fontWeight: "500",
        fontSize: 16,
        textAlign: "center"
    },
    viewList: {
        flex: 1,
        marginVertical: 20,
    }

})