import {FlatList,View,Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import { useRouter } from "expo-router";

export default function Filmes({data, index, serie}){
    const router = useRouter();
    return(
        data.backdrop_path &&
        <TouchableOpacity onPress={() => router.push({ pathname: serie ? 'verSerie' : 'verFilme', params: {id: data.id }  })} activeOpacity={0.9}>
            <View>
                <ImageBackground resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}` }} style={styles.img}>
                { index !== undefined && <Text style={styles.textTop5} >{index}</Text>}
                {serie && 
                <View style={styles.viewEpisodio}>
                    <Text style={styles.textEpisodio}>NOVOS EPISODIOS</Text>
                </View>}
                </ImageBackground>
            </View>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 170,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: "center"
    },
    textTop5: {
        position: "absolute",
        left: -25, top: 50 , 
        color: "#000", 
        fontSize: 100, 
        textShadowColor: '#FFF',
        fontWeight: "700",
        textShadowOffset: { width: 1, height: 5 },
        textShadowRadius: 10,
    }, 
    textEpisodio: {
        color: "#FFF",
        fontSize: 10,
        textAlign: "center",
        fontWeight: "700"
    },
    viewEpisodio: {
        backgroundColor: "#951FFD",
        width: "95%",
        height: 18,
        top: 148
    },
})