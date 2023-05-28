import { memo } from "react";
import {View,Text, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { useRouter } from "expo-router";
import Play  from '@expo/vector-icons/Ionicons';
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
dayjs.locale(ptBr)


 const Temporads = ({data}) => {
    const router = useRouter();
    return(

        // data.still_path  && (
            <View style={styles.container}>
                {/* <Text style={styles.data}>{dayjs(data?.release_date).format("D[ de ]MMM[, ]YYYY")}</Text> */}
                <Image resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original/aRquEWm8wWF1dfa9uZ1TXLvVrKD.jpg` }} style={styles.img}/>
                <View style={styles.viewTemEp}>
                    <Text style={styles.textTemEp}>1 - 1</Text>
                </View>
                <View style={styles.viewTituloEBnt}>
                    <View style={styles.viewTitulo}>
                        <Text style={styles.textTitulo}>Eles não estava preparados</Text>
                        <Text style={styles.textData}>set. 13, 2021</Text>
                    </View>
                    <Play name="play-circle-outline" size={35} color={"#FFF"} />
                </View>
            </View>
        // )
    )
}

export default memo(Temporads)

const { width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
        // justifyContent: "center",
        // backgroundColor: "red"
    },

    img: {
        width: 90,
        height: 50,
    },
    viewTemEp: {
        width: 90,
        height: 50,
        borderRightColor: "#FFF",
        borderRightWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    textTemEp: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "900"
    },
    viewTituloEBnt: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewTitulo: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: 10
    },
    textTitulo : {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
    },
    textData: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "400"
    }

    // bnt: {
    //     width: (width - 30) / 3,
    //     height: (height -200) / 3,
    //     marginHorizontal: 5,
    //     // backgroundColor: "green"
    //     // alignItems: "center"
    // }
})