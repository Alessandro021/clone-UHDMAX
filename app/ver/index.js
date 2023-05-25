import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Play  from '@expo/vector-icons/Ionicons';
import Download  from '@expo/vector-icons/MaterialCommunityIcons';
import Icon  from '@expo/vector-icons/Fontisto';


export default function Ver(){
    const {titulo, desc, img} = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "", headerStyle: {backgroundColor: "#000"}, headerTintColor: "#FFF"}} />
            <ImageBackground style={styles.img} source={{uri: `https://image.tmdb.org/t/p/original${img}`}}>

            </ImageBackground>

            <View style={styles.content}>
                <Text style={styles.title}>{titulo}</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.infoRelevante}>50% relevante</Text>
                    <Text style={styles.infoData}>2022</Text>
                    <View style={styles.viewPonto}>
                        <Text style={styles.textPonto}>7.1</Text>
                    </View>
                    <Text style={styles.textTempo}>169min.</Text>
                </View>

                <TouchableOpacity style={styles.bntAssistir} >
                    <Play name="play" size={30} color={"#000"} />
                    <Text style={styles.textAssistir}>Assistir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bntDownload} >
                    <Download name="download" size={30} color={"#FFF"} />
                    <Text style={styles.textDownload}>Baixar</Text>
                </TouchableOpacity>

                <Text style={styles.descricao}>{desc}</Text>

                <Text style={styles.genero}>Genero: Ação, Comedia</Text>

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

                <View style={{height: 2, backgroundColor: "#1A1A1A" }}>
                    <View style={{height: 4, width: "50%", backgroundColor: "#9D1FFF" }} />
                </View>

                <Text style={styles.tituloEnd}>TITULOS RECOMENDADOS</Text>

            </View>
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