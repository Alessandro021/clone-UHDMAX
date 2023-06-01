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
import ModalSeries from "../../../src/components/ModalFilmesOuSeries";
import LoaderPlacerolder from "../../../src/components/LoaderSkeleton/loader";

export default function SearchSerie(){
    const {top} = useSafeAreaInsets();
    const router = useRouter();
    const [series, setSeries] = useState([])
    const [capa, setCapa] = useState([])
    const [cont, setCont] = useState(1)
    const [visibleModal, setVisibleModal] = useState(false)
    const [response, setResponse] = useState({titulo: "Todos os gêneros", link: "/tv/popular"})
    const [loader, setLoader] = useState(true)

    const categorias = [
        {id: "1", name: "Todos os gêneros", link: "/tv/popular" },
        {id: "2", name: "Mais acessadas", link: "/tv/popular" },
        {id: "3", name: "Melhor classificação", link: `/discover/tv?sort_by=vote_average.desc` },
        {id: "4", name: "Novos epsódios", link: `/discover/tv?first_air_date.gte=${new Date().toISOString().split('T')[0]}`},
        {id: "5", name: "Kids", link: "/discover/tv?with_genres=16, 10751" },
        {id: "6", name: "Animes", link: "/search/tv?query=anime&with_genres=16" },
        {id: "7", name: "Netflix", link: "/tv/top_rated" },
        // {id: "8", name: "Recentes", link:"/tv/latest"},
    ]

    async function getSeries(){
    await api.get(`${response.link}`, {
            params:{
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
                region: 'BR',
                page: cont,
            }
        }).then(resposta => {
            if(response.titulo === "Mais acessadas"){
                let seriesMaisAcessadas = resposta.data.results
                seriesMaisAcessadas.sort((a, b) => b.popularity - a.popularity);
                setSeries(cont === 1 ? seriesMaisAcessadas :  series.concat(seriesMaisAcessadas) )
                setCapa(seriesMaisAcessadas[Math.floor(Math.random() * 20)])
                setLoader(false)
    
            } else {
                setSeries(cont === 1 ? resposta.data.results :  series.concat(resposta.data.results) )
                setCapa(resposta.data.results[Math.floor(Math.random() * 20)])
                setLoader(false)
         }
        })

    }

    function getResponse(response){
        if(response.link !== undefined){
            setResponse(response)
            setCont(1)
        }
     }

     const  renderItem = useCallback(({item}) => (
        <ListarFilme data={item} serie={true}/>
     ),[])


     useEffect(() => {
        getSeries()
    },[cont, response])
    
    return ( 
        <View style={styles.container}>
            
            {loader ? 
            (
             <LoaderPlacerolder />       
            ): (
            <View style={styles.ViewCardsSeries} >
                <FlatList
                    ListHeaderComponent={
                        <ImageBackground resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${capa?.poster_path}` }} style={styles.backgroundImage}>
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
                                    <Text style={styles.link}>Series</Text>
                                    <TouchableOpacity onPress={() => setVisibleModal(true)} style={styles.bntSelect} >
                                        <Text style={styles.link}>{response.titulo}</Text>
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

                                <Text style={styles.textFilme}>{capa?.name}</Text>

                                <View style={styles.viewTop}>
                                    <View style={styles.viewIconTop}><Text style={styles.textIconTop}>TOP</Text></View>
                                    <Text style={styles.textTopFilme}>Top 1 Series Semanais</Text>
                                </View>

                                <View style={styles.viewInfo}>
                                    <TouchableOpacity style={styles.bntTrailer} activeOpacity={0.9}>
                                        <View style={styles.iconContainer}>
                                            <Play style={styles.iconTrailer} name="play" size={30} color={"#FFFFFF"} />
                                        </View>
                                        <Text style={styles.textTrailer}>Ver Trailer</Text>
                                    </TouchableOpacity>

                                    <View style={styles.viewAssistir}>
                                        <TouchableOpacity onPress={() => router.push({ pathname: 'verSerie', params: { id: capa.id } })} style={styles.bntAssistir} activeOpacity={0.9}>
                                            <Play name="play" size={30} color={"#000"} />
                                            <Text style={styles.textAssistir}>Assistir</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => router.push({ pathname: 'verSerie', params: { id: capa.id } })} style={styles.bntTrailer} activeOpacity={0.9}>
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
                        <TouchableOpacity onPress={() => getSeries(setCont(cont + 1))} style={styles.bntMais}>
                            <Text style={styles.textMais}>Carregar mais...</Text>
                        </TouchableOpacity>
                    }
                    data={series}
                    keyExtractor={(item) => item.id?.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>
            )}
            
            <Modal visible={visibleModal} transparent={true} onRequestClose={() => setVisibleModal(false)} animationType='fade'>
                <ModalSeries data={categorias} onClose={() => setVisibleModal(false)} getResponse={getResponse} />
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
    ViewCardsSeries: {
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