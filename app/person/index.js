import { useEffect, useState, useCallback} from "react";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, StatusBar, ImageBackground, ScrollView, TouchableOpacity, tou, FlatList} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import  {api}  from "../../src/server/api";
import {LinearGradient} from 'expo-linear-gradient'


import Play  from '@expo/vector-icons/Ionicons';
import Info  from '@expo/vector-icons/MaterialCommunityIcons';
import Voltar  from '@expo/vector-icons/Ionicons';

import Logo from "../../src/assets/icon.png"
import ListarFilme from "../../src/components/ListarFilme";
import LoaderPlacerolder from "../../src/components/LoaderSkeleton/loader";



export default function Person(){
    const {id, name} = useLocalSearchParams();
    const {top} = useSafeAreaInsets();
    const router = useRouter();

    const [filmes, setFilmes] = useState([])
    const [capa, setCapa] = useState({})
    const [loader, setLoader] = useState(true)



    async function getPerson(){
        await api.get(`person/${id}/movie_credits`, {
            params:{
                api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
                language: "pt-BR",
            }
        }).then(response => {
            setFilmes(response.data.cast)
            setCapa(response.data.cast[Math.floor(Math.random() * 20)])
            setLoader(false)
        // console.log(data.cast)
        })
     }

     const  renderItem = useCallback(({item}) => (
        <ListarFilme data={item} date={true} />
     ),[])
   
    useEffect(() => {
        getPerson()
    }, [])
    return (
        <View style={styles.container}>
            <Stack.Screen options={{headerShown: false  ,title: "", headerStyle: {backgroundColor: "#000"}, headerTintColor: "#FFF"}}  />
            
            {loader ?
            (
                <LoaderPlacerolder />
            ):(
                <View style={styles.ViewCardsFilmes} >
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <ImageBackground resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${capa?.poster_path}` }} style={styles.backgroundImage}>

                                    <LinearGradient
                                        style={styles.gradient}
                                        colors={['rgba(0,0,0,0.20)', 'rgba(0,0,0,0.20)', 'rgba(0,0,0,0.20)', 'rgba(0,0,0,0.30)', 'rgba(0,0,0,1)']}
                                    />

                                    <View style={[styles.header, { marginTop: top }]}>
                                        <TouchableOpacity onPress={() => router.push("/home")} style={styles.bntVoltar}>
                                            <Voltar name="md-arrow-back-outline" size={24} color={"#FFF"} />
                                        </TouchableOpacity>
                                    </View>


                                    {/*INFORMAÇOES DENTRO DA IMAGEBACKGROUD */}
                                    <View style={styles.content}>
                                        <View style={styles.viewLogoContent}>
                                            <Image source={Logo} style={styles.logoContent} />
                                            <Text style={styles.textLogo}>Filme</Text>
                                        </View>

                                        <Text style={styles.textFilme}>{capa?.title}</Text>

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
                                                <TouchableOpacity onPress={() => router.push({ pathname: 'verFilme', params: { id: capa?.id } })} style={styles.bntAssistir} activeOpacity={0.9}>
                                                    <Play name="play" size={30} color={"#000"} />
                                                    <Text style={styles.textAssistir}>Assistir</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <TouchableOpacity onPress={() => router.push({ pathname: 'verFilme', params: { id: capa?.id } })} style={styles.bntTrailer} activeOpacity={0.9}>
                                                <View style={styles.iconContainer}>
                                                    <Info style={styles.iconTrailer} name="information-outline" size={25} color={"#FFFFFF"} />
                                                </View>
                                                <Text style={styles.textTrailer}>Saiba Mais</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ImageBackground>
                                <Text style={styles.name}>{name}</Text>
                            </>
                        }
                        data={filmes}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        numColumns={3}
                    // columnWrapperStyle={styles.listarFilme}
                    />
                </View>
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
        // justifyContent: "space-between",
        marginBottom: 30,
        alignContent: "center",
        justifyContent: "center"
    },
    header: {
        zIndex: 98,
        marginHorizontal: 20,
        width: 30,
        height: 30,
    },
    bntVoltar:{
        alignContent: "center",
        justifyContent: "center"
    },

    /*STYLE DAS INFORMAÇOES DENTRO DO IMAGEBACKGROUND */

    content: {
        zIndex: 99,
        flex: 1,
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

    name: {
        color: "#FFFFFF",
        marginBottom: 30,
        marginLeft: 10,
        fontSize: 30,
        fontWeight: "900",
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