import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, useCallback, Modal} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Play from '@expo/vector-icons/Ionicons';
import Download from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from '@expo/vector-icons/Fontisto';
import Down  from '@expo/vector-icons/Entypo';
import { useEffect, useState } from "react";
import { api } from "../../src/server/api"


import Temporadas from "../../src/components/Temporadas";
import ModalTemporadas from "../../src/components/ModalTemporadas";

export default function VerSerie() {
    const { id } = useLocalSearchParams();
    const [serie, setSerie] = useState({})
    const [temporadas, setTemporadas] = useState([])
    const [categ, setCateg] = useState()
    const [numTemporada, setNumTemporada] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)

    //https://api.themoviedb.org /3/tv/ {series_id} /videos
    async function getSerie() {
        let category = []

        const { data } = await api.get(`/tv/${id}`, {
            params: {
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
            }

        })
        setSerie(data)
        // console.log(data)
        // numTemp = data.number_of_seasons

        category = data.genres.map(item => (item.name))
        setCateg(category.join(', '))

    }

    async function getTemporadas(temporada) {
        const { data } = await api.get(`/tv/${id}/season/${temporada}`, {
            params: {
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
            }

        })
        setTemporadas(data.episodes)
        // console.log(data.episodes)
    }

    function buscaTemporada(valor){
        setNumTemporada(valor)
        getTemporadas(valor)
    }

    const  renderItem = (({item}) => (
        <Temporadas data={item} />
     ))

    useEffect(() => {
        getSerie()
    }, [])
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "", headerStyle: { backgroundColor: "#000" }, headerTintColor: "#FFF" }} />
            <ImageBackground style={styles.img} source={{ uri: `https://image.tmdb.org/t/p/original${serie.backdrop_path}` }}>

            </ImageBackground>

                       
            {/* <Temporadas /> */}

            <FlatList
                // style={styles.sectionList}
                ListHeaderComponent={
                    <View style={styles.content}>
                        <Text style={styles.title}>{serie.name}</Text>

                        <View style={styles.viewInfo}>
                            <Text style={styles.infoRelevante}>50% relevante</Text>
                            <Text style={styles.infoData}>{serie.last_air_date?.slice(0, 4)}</Text>
                            <View style={styles.viewPonto}>
                                <Text style={styles.textPonto}>{serie.vote_average?.toFixed(1)}</Text>
                            </View>
                            <Text style={styles.textTempo}>{serie.number_of_seasons} Temporadas HD</Text>
                        </View>

                        <TouchableOpacity style={styles.bntAssistir} >
                            {/* <Play name="play" size={30} color={"#000"} /> */}
                            <Text style={styles.textAssistir}>Session {serie.number_of_seasons} Temporada(as) disponiveis</Text>
                        </TouchableOpacity>

                        <Text style={styles.descricao}>{serie.overview}</Text>

                        <Text style={styles.genero}><Text style={{ fontWeight: "900" }}>Genero: </Text> {categ}</Text>

                        <View style={styles.viewAction}>
                            <TouchableOpacity style={styles.bntAction} activeOpacity={0.9}>
                                <View style={styles.iconView}>
                                    <Icon name="like" size={30} color={"#FFFFFF"} />
                                </View>
                                <Text style={styles.textAction}>Classifique</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.bntAction} activeOpacity={0.9}>
                                <View style={styles.iconView}>
                                    <Icon name="favorite" size={30} color={"#FFFFFF"} />
                                </View>
                                <Text style={styles.textAction}>Salvar favoritos</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 2, backgroundColor: "#1A1A1A" }}>
                            <View style={{ height: 4, width: "50%", backgroundColor: "#9D1FFF" }} />
                        </View>

                        <Text style={styles.tituloEnd}>EPISODIOS TITULOS RECOMENDADOS</Text>

                        <View style={styles.viewTemporadas}>
                            <TouchableOpacity onPress={() => setVisibleModal(true)} style={styles.bntTemporadas}>
                                <Text style={styles.textTemporadas}>Temporadas</Text>
                                <Down name="chevron-down" size={20} color={"#FFF"} />
                            </TouchableOpacity>
                        </View>

                        {numTemporada && (
                            <View style={styles.viewCardTemporada}>
                                <View style={styles.viewCardCor} />
                                <Text style={styles.textCardTemporada}>Temporada {numTemporada}</Text>
                            </View>
                        )} 
                    </View>
                    
                }

                data={temporadas}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                />


                <Modal visible={visibleModal} transparent={true} onRequestClose={() => setVisibleModal(false)} animationType='fade'>
                    <ModalTemporadas data={serie.seasons} onClose={() => setVisibleModal(false)} buscaTemporada={buscaTemporada} />
                </Modal>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    img: {
        marginTop: 10,
        height: 260
    },
    content: {
        // flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
    viewInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 10,

    },
    infoRelevante: { color: "#7AC636" },
    infoData: { color: "#C9C9C9" },
    viewPonto: {
        backgroundColor: "#9D1FFF",
        borderRadius: 3
    },
    textPonto: {
        padding: 3,
        fontSize: 10,
        color: "#FFF",
        fontWeight: "900"
    },
    textTempo: {
        color: "#C9C9C9",
    },

    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: "900",
    },

    bntAssistir: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFF",
        justifyContent: "center",
        borderRadius: 5
    },
    textAssistir: {
        fontWeight: "900",
        padding: 10,
        fontSize: 16
    },
    descricao: {
        color: '#fff',
        fontSize: 17,
        textAlign: "justify",
    },
    genero: {
        color: '#fff',
        fontSize: 16,
    },
    viewAction: {
        flexDirection: 'row',
    },

    bntAction: {
        flexDirection: "column",
        padding: 20
    },
    iconView: {
        alignItems: "center",
        marginBottom: 6
    },
    iconAction: {

    },
    textAction: {
        color: '#fff',
    },
    tituloEnd: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "900",
        marginTop: 5,
        margin: 20,
    },
    viewTemporadas: {
        backgroundColor: "#1A1A1A",
        alignSelf: "flex-start",
        borderRadius: 8,
        marginBottom: 20
    },
    bntTemporadas: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 20,
        gap: 5
    },
    textTemporadas: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "900"
    }, 
    viewCardTemporada: { 
        flex: 1, 
        height: 50, 
        flexDirection: "row",
        alignItems: "center", 
        gap: 15,
        backgroundColor: "#111111"
    },
    viewCardCor: {
        width: 90,
        height: 50,
        backgroundColor: "#171717"
    },
    textCardTemporada: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "900"
    }
})