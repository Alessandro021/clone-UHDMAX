import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar, ImageBackground, ScrollView, TouchableOpacity, tou, FlatList, ActivityIndicator} from "react-native";
import { Link , useRouter} from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Play  from '@expo/vector-icons/Ionicons';
import Info  from '@expo/vector-icons/MaterialCommunityIcons';
import Filmes from "../../../src/components/FilmesFavoritos";
import Person from "../../../src/components/Person";
import {LinearGradient} from 'expo-linear-gradient'


// import ImageFundo from "../../src/assets/filme.jpg"
import Logo from "../../../src/assets/icon.png"
import { api } from "../../../src/server/api";
import LoaderPlacerolder from "../../../src/components/LoaderSkeleton/loader";


export default function Home(){ 
const {top} = useSafeAreaInsets();
const router = useRouter();


const [filmesLancamentos, setFilmesLancamentos] = useState([])
const [series, setSeries] = useState([])
const [novasSeries, setNovasSeries] = useState([])
const [person, setPerson] = useState([])
const [novosFilmes, setNovosFilmes] = useState([])
const [top5, setTop5] = useState([])
const [capa, setCapa] = useState([])
const [loader, setLoader] = useState(true)

 async function getFilmesLancamentos(){
    await api.get("movie/now_playing", {
        params:{
            api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
            language: "pt-BR",
            page: 1,
        }
    }).then((response) => {
        setFilmesLancamentos(response.data.results)
        setCapa(response.data.results[Math.floor(Math.random() * 20)])
        setLoader(false)
    })
 }

 async function getTopCinco(){
    const {data} = await api.get("movie/now_playing", {
        params:{
            api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
            language: "pt-BR",
            region: 'BR',
            page: 1,
        }
    })

    setTop5(data.results.slice(0,5))
 }
 async function getNovosFilmes(){
    const {data} = await api.get("movie/upcoming", {
        params:{
            api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
            language: "pt-BR",
            page: 1,
        }
    })

    setNovosFilmes(data.results)
 } 
 async function getSeries(){
    const {data} = await api.get("/tv/top_rated", {
        params:{
            api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
            language: "pt-BR",
            // sort_by: 'popularity.desc',
            // region: 'BR',
            // with_original_language: 'pt',
            page: 1,
        }
    })

    setSeries(data.results)

 }

 async function getNovasSeries(){
    const {data} = await api.get("/tv/on_the_air", {
        params:{
            api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
            language: "pt-BR",
            sort_by: 'popularity.desc',
            region: 'BR',
            // with_original_language: 'pt',
            page: 1,
        }
    })

    setNovasSeries(data.results)

 }
 async function getPerson(){
    const {data} = await api.get("person/popular", {
        params:{
            api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
            language: "pt-BR",
            region: 'BR',
            page: 1,
        }
    })
    // console.log(data.results)
    setPerson(data.results)
 } 



 const  renderItemTop5 = useCallback(({item, index}) => (
    <Filmes data={item} index={index + 1}/>
 ),[])

 const  renderItemNovasSeries = useCallback(({item, index}) => (
    <Filmes data={item} serie={true} />
 ),[])

 const  renderItemNovosFilmes = useCallback(({item}) => (
    <Filmes data={item}/>
 ),[])

 const  renderItemFilmesLancamentos = useCallback(({item}) => (
    <Filmes data={item}/>
 ),[])
 const  renderItemSeries = useCallback(({item}) => (
    <Filmes data={item} serie={true} novo={true}/>
 ),[])


    useLayoutEffect(() => {
        getFilmesLancamentos()
        getPerson()
        getTopCinco()
        getSeries()
        getNovasSeries()
        getNovosFilmes()

    return () => {

    }
    },[])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent={true}/>

        
            {loader ? (
            // <ActivityIndicator
            //     size="large"
            //     color="#0000ff"
            //     style={{
            //         position: 'absolute',
            //         top: '50%',
            //         left: '50%',
            //         }}
            // />
            <LoaderPlacerolder />
            ) : (

            <ScrollView>
                <ImageBackground resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${capa.poster_path}` }} style={styles.backgroundImage}>
                    {/*HEADER */}
                    <LinearGradient
                        style={styles.gradient}
                        colors={['rgba(0,0,0,0.20)', 'rgba(0,0,0,0.20)', 'rgba(0,0,0,0.20)', 'rgba(0,0,0,0.30)', 'rgba(0,0,0,1)']}
                    />
                    <View style={[styles.header, { marginTop: top }]}>
                        <View style={styles.viewLogo}>
                            <Image source={Logo} style={styles.logo} />
                        </View>

                        <View style={styles.viewLink}>
                            <Link href="/filmes" ><Text style={styles.link}>Filmes</Text></Link>
                            <Link href="/series" ><Text style={styles.link}>Series</Text></Link>
                            <Link href="/canais" ><Text style={styles.link}>Canais de TV</Text></Link>
                        </View>
                    </View>

                    {/*INFORMAÇOES DENTRO DA IMAGEBACKGROUD */}
                    <View style={styles.content}>
                        <View style={styles.viewLogoContent}>
                            <Image source={Logo} style={styles.logoContent} />
                            <Text style={styles.textLogo}>Filme</Text>
                        </View>

                        <Text style={styles.textFilme}>{capa.title}</Text>

                        <View style={styles.viewTop}>
                            <View style={styles.viewIconTop}><Text style={styles.textIconTop}>TOP</Text></View>
                            <Text style={styles.textTopFilme}>Top 1 Filmes Semanais</Text>
                        </View>

                        <View style={styles.viewInfo}>
                            <TouchableOpacity style={styles.bntTrailer} activeOpacity={0.9}>
                                <View style={styles.iconContainer}>
                                    <Play style={styles.iconTrailer} name="play" size={30} color={"#FFFFFF"} />
                                </View>
                                <Text style={styles.textTrailer}>Ver Trailer</Text>
                            </TouchableOpacity>

                            <View style={styles.viewAssistir}>
                                <TouchableOpacity onPress={() => router.push({ pathname: 'verFilme', params: { id: capa.id } })} style={styles.bntAssistir} activeOpacity={0.9}>
                                    <Play name="play" size={30} color={"#000"} />
                                    <Text style={styles.textAssistir}>Assistir</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => router.push({ pathname: 'verFilme', params: { id: capa.id } })} style={styles.bntTrailer} activeOpacity={0.9}>
                                <View style={styles.iconContainer}>
                                    <Info style={styles.iconTrailer} name="information-outline" size={25} color={"#FFFFFF"} />
                                </View>
                                <Text style={styles.textTrailer}>Saiba Mais</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>

                <View style={styles.ViewCardsFilmes} >
                    <Text style={styles.TituloCards}>Series atualizadas</Text>
                    <FlatList
                        data={series}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemSeries}
                    />
                </View>

                <View style={styles.ViewCardsFilmes} >
                    <Text style={styles.TituloCards}>Top 5 de hoje no Brasil</Text>
                    <FlatList
                        data={top5}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemTop5}
                    />
                </View>


                <View style={styles.ViewCardsFilmes} >
                    <Text style={styles.TituloCards}>Lançamentos</Text>
                    <FlatList
                        data={filmesLancamentos}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemFilmesLancamentos}
                    />
                </View>

                <View style={styles.ViewCardsFilmes} >
                    <Text style={styles.TituloCards}>Novos filmes</Text>
                    <FlatList
                        data={novosFilmes}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemNovosFilmes}
                    />
                </View>

                <View style={styles.ViewCardsFilmes} >
                    <Text style={styles.TituloCards}>Novas series</Text>
                    <FlatList
                        data={novasSeries}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemNovasSeries}
                    />
                </View>

                <View style={[styles.ViewCardsFilmes, { marginBottom: 50 }]} >
                    <Text style={styles.TituloCards}>Atores Populares</Text>
                    <FlatList
                        data={person}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Person data={item} />}
                    />
                </View>

            </ScrollView>

            )}
        
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },

    /*STYLE DO HEADER */

    backgroundImage: {
        width: '100%',
        height: 720,
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    header: {
        zIndex: 98,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    viewLogo: {
        width: "20%",
        alignItems: "center"
    },
    viewLink:{
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    
    logo: {
        width: 40,
        height: 50,
    },
    link: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    /*STYLE DAS INFORMAÇOES DENTRO DO IMAGEBACKGROUND */

    content: {
        zIndex: 99,
        width: "100%",
        // height: 250,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        
    },
    viewLogoContent: {
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    logoContent: {
        width: 15,
        height: 20,
        marginRight: 10
    },
    textLogo: {
        color: "#FFFFFF",
        fontSize: 17,
    },
    textFilme: {
        color: "#FFF",
        fontSize: 50,
        fontWeight: "900",
        textAlign: "center"
    },
    viewTop: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 10,
        gap: 10
    },
    viewIconTop:{
        width: 20,
        height: 22,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        alignContent: "center",
        justifyContent: "center"
    },
    textIconTop: {
        color: "#FFFFFF",
        fontSize: 8,
        textAlign: "center",
        fontWeight: "700"
    },
    textTopFilme: {
        color: "#FFFFFF",
        fontWeight: "700"
    },
    viewInfo:{
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 30,
        marginTop: 20
    },
    bntTrailer: {
        flexDirection: "column",
        justifyContent: "center",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    iconTrailer: {
        marginBottom: 5,
    },
    textTrailer: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },

    viewAssistir: {
        alignItems: "center", 
        justifyContent: "center"
    },
    bntAssistir: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:  "#FFF",
        width: 120,
        height: 40
    },
    textAssistir: {
        marginLeft: 10,
        fontWeight: "700",   
    },

    /*STYLE */

    img: {
        width: 180,
        height: 300,
        borderRadius: 5,
        marginRight: 15
    },
    ViewCardsFilmes: {
        marginVertical: 20,
    },
    TituloCards: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "900",
        marginBottom: 10,
        marginLeft: 10
    },
    gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 720,
        zIndex: 1,
        backgroundColor: 'transparent'
    }

})