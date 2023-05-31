import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Modal, FlatList} from "react-native";
import { useRouter} from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Play  from '@expo/vector-icons/Ionicons';
import Info  from '@expo/vector-icons/MaterialCommunityIcons';
import Down  from '@expo/vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient'

import Logo from "../../../src/assets/icon.png"
import { api } from "../../../src/server/api";

import ListarFilme from "../../../src/components/ListarFilme";
import ModalFilmes from "../../../src/components/ModalFilmesOuSeries";

export default function SearchFilme(){
    const {top} = useSafeAreaInsets();
    const router = useRouter();
    const [filmes, setFilmes] = useState([])
    const [capa, setCapa] = useState([])
    const [cont, setCont] = useState(1)
    const [visibleModal, setVisibleModal] = useState(false)
    const [response, setResponse] = useState({titulo: "Todos os gêneros", link: "movie/now_playing"})

    const categorias = [
        {id: "1", name: "Todos os gêneros", link: "/movie/popular" },
        {id: "2", name: "Lançamentos", link: "movie/now_playing" },
        {id: "3", name: "Novidades", link: "/movie/upcoming" },
        {id: "4", name: "Mais acessados", link: "/movie/top_rated" },
        {id: "5", name: "Ação", link: "/discover/movie?with_genres=28" },
        {id: "6", name: "Aventura", link: "/discover/movie?with_genres=12" },
        {id: "7", name: "Animação", link: "/discover/movie?with_genres=16" },
        {id: "8", name: "Comédia", link: "/discover/movie?with_genres=35" },
        {id: "9", name: "Crime", link: "/discover/movie?with_genres=80" },
        {id: "10", name: "Documentário", link: "/discover/movie?with_genres=99" },
        {id: "11", name: "Drama", link: "/discover/movie?with_genres=18" },
        {id: "12", name: "Família", link: "/discover/movie?with_genres=10751" },
        {id: "13", name: "Fantasia", link: "/discover/movie?with_genres=14" },
        {id: "14", name: "História", link: "/discover/movie?with_genres=36" },
        {id: "15", name: "Terror", link: "/discover/movie?with_genres=27" },
        {id: "16", name: "Música", link: "/discover/movie?with_genres=10402" },
        {id: "17", name: "Mistério", link: "/discover/movie?with_genres=9648" },
        {id: "18", name: "Romance", link: "/discover/movie?with_genres=10749" },
        {id: "19", name: "Ficção", link: "/discover/movie?with_genres=878" },
        {id: "20", name: "Cinema", link: "/discover/movie?with_genres=10770" },
        {id: "21", name: "Thriller", link: "/discover/movie?with_genres=53" },
        {id: "22", name: "Guerra", link: "/discover/movie?with_genres=10752" },
        {id: "23", name: "Faroeste", link: "/discover/movie?with_genres=37" },
        {id: "24", name: "2023", link: "/discover/movie?primary_release_year=2023" },
        {id: "25", name: "2022", link: "/discover/movie?primary_release_year=2022" },
        {id: "26", name: "2021", link: "/discover/movie?primary_release_year=2021" },
        {id: "27", name: "2020", link: "/discover/movie?primary_release_year=2020" },
        {id: "28", name: "2019", link: "/discover/movie?primary_release_year=2019" },
        {id: "29", name: "2018", link: "/discover/movie?primary_release_year=2018" },
        {id: "30", name: "2017", link: "/discover/movie?primary_release_year=2017" },
        {id: "31", name: "2016", link: "/discover/movie?primary_release_year=2016" },
        {id: "32", name: "2015", link: "/discover/movie?primary_release_year=2015" },
        {id: "33", name: "2014", link: "/discover/movie?primary_release_year=2014" },
        {id: "34", name: "2013", link: "/discover/movie?primary_release_year=2013" },
        {id: "35", name: "2012", link: "/discover/movie?primary_release_year=2012" },
        {id: "36", name: "2011", link: "/discover/movie?primary_release_year=2011" },
        {id: "37", name: "2010", link: "/discover/movie?primary_release_year=2010" },
    ]


    async function getFilmes(){
        const {data} = await api.get(`${response.link}`, {
            params:{
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
                region: 'BR',
                page: cont,
            }
        })
    
        setFilmes(cont === 1 ? data.results :  filmes.concat(data.results) )
        setCapa(data.results[Math.floor(Math.random() * 20)])
     }

     function getResponse(response){
        if(response.link !== undefined){
            setResponse(response)
            setCont(1)
        }
     }

     const  renderItem = useCallback(({item}) => (
        <ListarFilme data={item} date={false}/>
     ),[])

     useEffect(() => {
        getFilmes()
    // return () => {
        
    // }
    },[cont, response])
    
    return (
        <View style={styles.container}>
             
            <View style={styles.ViewCardsFilmes} >
                <FlatList
                ListHeaderComponent={
                        <ImageBackground  resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${capa?.poster_path}` }} style={styles.backgroundImage}>
                            {/*HEADER */}
                            <LinearGradient
                                style={styles.gradient}
                                colors={[ 'rgba(0,0,0,0.20)', 'rgba(0,0,0,0.20)', 'rgba(0,0,0,0.20)','rgba(0,0,0,0.30)', 'rgba(0,0,0,1)']}
                            />
                            <View style={[styles.header, { marginTop: top }]}>
                                <View style={styles.viewLogo}>
                                    <Image source={Logo} style={styles.logo} />
                                </View>

                                <View style={styles.viewLink}>
                                    <Text style={styles.link}>Filmes</Text>
                                    <TouchableOpacity style={styles.bntSelect} >
                                        <Text onPress={() => setVisibleModal(true)} style={styles.link}>{response.titulo}</Text>
                                        <Down name="md-caret-down-sharp" size={14} color={"#FFF"} />
                                    </TouchableOpacity>
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
                }
                    ListFooterComponent={
                    <TouchableOpacity onPress={() => getFilmes(setCont(cont+1))} style={styles.bntMais}>
                        <Text style={styles.textMais}>Carregar mais...</Text>
                    </TouchableOpacity>
                    }
                    data={filmes}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>

            <Modal visible={visibleModal} transparent={true} onRequestClose={() => setVisibleModal(false)} animationType='fade'>
                <ModalFilmes data={categorias} onClose={() => setVisibleModal(false)} getResponse={getResponse} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    backgroundImage: {
        width: "100%",
        height: 720,
        flexDirection: "column",
        // justifyContent: "space-between",
        marginBottom: 30,
        // ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)', // Cor do gradiente
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
        gap: 50,
        justifyContent: "flex-start",
        alignItems: "center",
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
    bntSelect: {
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },

    /*STYLE DAS INFORMAÇOES DENTRO DO IMAGEBACKGROUND */

    content: {
        zIndex: 99,
        flex: 1,
        // height: 250,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",       
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
    ViewCardsFilmes: {
        flex: 1,
    },
    bntMais: {
        justifyContent: "center",
        backgroundColor: "#FFF",
        height: 40, 
        borderRadius: 8,
        marginBottom: 20,
    },
    textMais: { 
        textAlign: "center",
        fontSize: 16,
        fontWeight: "900"
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