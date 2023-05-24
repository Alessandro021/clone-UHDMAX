import {FlatList,View,Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import Icon from "@expo/vector-icons/Feather"

export default function Filmes({data, index, serie}){
    return(
        // <FlatList style={{ flex: 1}}
        //     data={data}
        //     keyExtractor={(item) => item.id.toString()}
        //     horizontal={true}
        //     // ItemSeparatorComponent={<View style={{width: 5}}/>}
        //     renderItem={({ item }) => (
                <TouchableOpacity onPress={{}}>
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
        //     )}
        // />
    )
}
const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 170,
        borderRadius: 5,
        marginHorizontal: 15,
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