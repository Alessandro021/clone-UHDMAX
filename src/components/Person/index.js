import {FlatList,View,Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import { useRouter} from "expo-router"
import Icon from "@expo/vector-icons/Feather"

export default function Person({data}){
    const router = useRouter()
    return(
        
    data.profile_path &&
        
        <TouchableOpacity onPress={() => router.push({ pathname: "person", params: {id: data.id, name: data.name }  })}>
            <View>
                <Image resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${data.profile_path}`}} style={styles.img}/>
            </View>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    img: {
        width: 180,
        height: 300,
        borderRadius: 5,
        marginRight: 15
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