import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator, Platform} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Play  from '@expo/vector-icons/Ionicons';
import Download  from '@expo/vector-icons/MaterialCommunityIcons';
import Icon  from '@expo/vector-icons/Fontisto';
import Like  from '@expo/vector-icons/AntDesign';
import { useEffect, useState, useCallback} from "react";
import {api} from "../../src/server/api"
import YoutubePlayer from "react-native-youtube-iframe";

import LoaderFimesESeries from "../../src/components/LoaderSkeleton/loaderFilmeESeries";

export default function VerFilme(){
    const {id} = useLocalSearchParams();
    const [filme, setFilme] = useState({})
    const [similares, setSimilares] = useState([])
    const [categ, setCateg] = useState("")
    const [favorito, setFavorito] = useState(false)
    const [like, setLike] = useState(false)
    const [loader, setLoader] = useState(true)
    const [playing, setPlaying] = useState(false);
    const [traler, setTraler] = useState(null);
    const [showTrailer, setshowTrailer] = useState(false)



    const playerParams = {
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        disablekb: 1,
        enablejsapi: 0,
        widget_referrer: traler
      };

    

    async function getFilme(){
        let category = []
        await api.get(`/movie/${id}`,{
            params:{
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
            }
            
        }).then(response => {
            setFilme(response.data)
            category =  response.data.genres.map(item => (item.name))
            setCateg(category.join(', '))
            setLoader(false)
        })
    }

    async function trailerFilme() {
        const { data } = await api.get(`/movie/${id}/videos`, {
            params: {
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
            }

        })
        if(data.results.length != 0){
            data.results[1] ? setTraler(data.results[1].key) : setTraler(data.results[0].key)
        }
    }

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);

    useEffect(() => {
        getFilme()
        trailerFilme()
    }, [])
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "", headerStyle: {backgroundColor: "#000"}, headerTintColor: "#FFF"}} />
            {loader ? 
            (
                <LoaderFimesESeries />
            ):(
            <>
                <ImageBackground style={styles.img} source={{ uri: `https://image.tmdb.org/t/p/original${filme.backdrop_path}` }}>
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
                            <Play name="play-circle" size={100} color="#9D1FFF"/>
                        </TouchableOpacity>
                    }
                    
                </ImageBackground>

                <View style={styles.content}>
                    <Text style={styles.title}>{filme.title}</Text>

                    <View style={styles.viewInfo}>
                        <Text style={styles.infoRelevante}>50% relevante</Text>
                        <Text style={styles.infoData}>{filme.release_date?.slice(0, 4)}</Text>
                        <View style={styles.viewPonto}>
                            <Text style={styles.textPonto}>{filme.vote_average?.toFixed(1)}</Text>
                        </View>
                        <Text style={styles.textTempo}>{filme.runtime}min.</Text>
                    </View>

                    <TouchableOpacity style={styles.bntAssistir} >
                        <Play name="play" size={30} color={"#000"} />
                        <Text style={styles.textAssistir}>Assistir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bntDownload} >
                        <Download name="download" size={30} color={"#FFF"} />
                        <Text style={styles.textDownload}>Baixar</Text>
                    </TouchableOpacity>

                    <Text style={styles.descricao}>{filme.overview}</Text>

                    <Text style={styles.genero}><Text style={{ fontWeight: "900" }}>Genero: </Text>{categ}</Text>

                    <View style={styles.viewAction}>
                        <TouchableOpacity onPress={() =>setLike(!like)} style={styles.bntAction} activeOpacity={0.9}>
                            <View style={styles.iconView}>
                                <Like name={like ? "like1" : "like2"} size={30} color={"#FFFFFF"} />
                            </View>
                            <Text style={styles.textAction}>Classifique</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setFavorito(!favorito)} style={styles.bntAction} activeOpacity={0.9}>
                            <View style={styles.iconView}>
                                <Icon name="favorite" size={30} color={favorito ? "#9D1FFF" : "#FFFFFF"} />
                            </View>
                            <Text style={[styles.textAction, favorito ? { color: "#9D1FFF" } : { color: "#FFF" }]}>{favorito ? "Salvo" : "Salvar favoritos"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 2, backgroundColor: "#1A1A1A" }}>
                        <View style={{ height: 4, width: "50%", backgroundColor: "#9D1FFF" }} />
                    </View>

                    <Text style={styles.tituloEnd}>TITULOS RECOMENDADOS</Text>
                </View>
            </>
            )}
            
        </View>
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
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
    viewInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 10,

    },
    infoRelevante: {color: "#7AC636"},
    infoData: {color:"#C9C9C9"},
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
        fontSize:25,
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
        fontWeight: "900"
    },
    bntDownload: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#1A1A1A",
        justifyContent: "center",
        borderRadius: 5
    },
    textDownload: {
        fontWeight: "900",
        color: "#FFF"
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
        marginTop: 5
    }
})