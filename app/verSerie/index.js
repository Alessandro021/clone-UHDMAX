import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, useCallback, Modal} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Play from '@expo/vector-icons/Ionicons';
import Download from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from '@expo/vector-icons/Fontisto';
import Like  from '@expo/vector-icons/AntDesign';
import Down  from '@expo/vector-icons/Entypo';
import { useEffect, useState } from "react";
import { api } from "../../src/server/api"
import YoutubePlayer from "react-native-youtube-iframe";


import Temporadas from "../../src/components/Temporadas";
import ModalTemporadas from "../../src/components/ModalTemporadas";
import LoaderFimesESeries from "../../src/components/LoaderSkeleton/loaderFilmeESeries";

export default function VerSerie() {
    const { id } = useLocalSearchParams();
    const [serie, setSerie] = useState({})
    const [temporadas, setTemporadas] = useState([])
    const [categ, setCateg] = useState()
    const [numTemporada, setNumTemporada] = useState(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [loader, setLoader] = useState(true)
    const [like, setLike] = useState(false)
    const [favorito, setFavorito] = useState(false)
    const [traler, setTraler] = useState(null);
    const [showTrailer, setshowTrailer] = useState(false)
    const [idTemporada, setIdTemporada] = useState(null)
    const [playing, setPlaying] = useState(false);
    

    //https://api.themoviedb.org /3/tv/ {series_id} /videos
    async function getSerie() {
        let category = []

        await api.get(`/tv/${id}`, {
            params: {
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
                region: 'BR',
            }

        }).then(response => {

            setSerie(response.data)
        // console.log(response.data)
        // numTemp = response.data.number_of_seasons

            category = response.data.genres.map(item => (item.name))
            setCateg(category.join(', '))
            setLoader(false)
        })
        
    }

    async function getTemporadas(temporada) {
        const { data } = await api.get(`/tv/${id}/season/${temporada}`, {
            params: {
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
            }

        })
        setIdTemporada(data.id)
        setTemporadas(data.episodes)
        // console.log(data.poster_path)
    }

    function buscaTemporada(valor){
        setNumTemporada(valor)
        getTemporadas(valor)
    }

    const  renderItem = (({item}) => (
        <Temporadas data={item} />
     ))

     async function trailerSerie() {
        const { data } = await api.get(`/tv/${id}/videos`, {
            params: {
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
                region: 'BR',
            }

        })
        if(data.results.length != 0){
            data.results[1] ? setTraler(data.results[1].key) : setTraler(data.results[0].key)
        }
    }

     const togglePlaying = (() => {
        setPlaying((prev) => !prev);
      });

    useEffect(() => {
        getSerie()
        trailerSerie()
    }, [])
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "", headerStyle: { backgroundColor: "#000" }, headerTintColor: "#FFF" }} />

            {loader ?
            (
                <LoaderFimesESeries />
            ):(
                <>
                    <ImageBackground style={styles.img} source={{ uri: `https://image.tmdb.org/t/p/original${serie.backdrop_path }` }}>
                    {(traler && showTrailer) && 
                    <YoutubePlayer
                        height={260}
                        play={playing}
                        videoId={traler}
                        // contentScale={1.1}
                        webViewProps={{
                            allowsInlineMediaPlayback: true,
                            allowsFullscreenVideo: true,
                            mediaPlaybackRequiresUserAction: false,
                            opacity: 0.99
                          }}
                    />
                        //<CustomYouTubePlayer  videoId={traler}/>
                    }

                   
                    {(!showTrailer && traler) &&
                        <TouchableOpacity onPress={() => {togglePlaying(), setshowTrailer(true) }} style={{flex: 1, position: "relative",alignItems: "center", justifyContent: "center" }}>
                            <Play name="play-circle" size={100} color="#9D1FFF" />
                        </TouchableOpacity>
                    }
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

                                <TouchableOpacity style={styles.bntAssistir}
                                 >
                                    {/* <Play name="play" size={30} color={"#000"} /> */}
                                    <Text style={styles.textAssistir}>Session {serie.number_of_seasons} Temporada(as) disponiveis</Text>
                                </TouchableOpacity>

                                <Text style={styles.descricao}>{serie.overview}</Text>

                                <Text style={styles.genero}><Text style={{ fontWeight: "900" }}>Genero: </Text> {categ}</Text>

                                <View style={styles.viewAction}>
                                    <TouchableOpacity onPress={() =>setLike(!like)} style={styles.bntAction} activeOpacity={0.9}>
                                        <View style={styles.iconView}>
                                            <Like name={like ? "like1" : "like2"} size={30} color={"#FFFFFF"} />
                                        </View>
                                        <Text style={styles.textAction}>Classifique</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() =>setFavorito(!favorito)} style={styles.bntAction} activeOpacity={0.9}>
                                        <View style={styles.iconView}>
                                            <Icon name="favorite" size={30} color={favorito ? "#9D1FFF" : "#FFFFFF"} />
                                        </View>
                                        <Text style={[styles.textAction, favorito ? {color: "#9D1FFF"} : {color: "#FFF"}]}>{favorito ? "Salvo" : "Salvar favoritos"}</Text>
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
                </>
            )}
            
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