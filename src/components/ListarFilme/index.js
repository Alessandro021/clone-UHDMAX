import { memo } from "react";
import {View,Text, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
dayjs.locale(ptBr)


 const ListarFilmes = ({data, index, serie}) => {
    const router = useRouter();
    return(
        data.poster_path  && (
            <TouchableOpacity style={styles.bnt} onPress={() => router.push({ pathname: serie ? 'verSerie' : 'verFilme', params: {id: data.id }  })} activeOpacity={0.9}>
                
                    <Image resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${data?.poster_path}` }} style={styles.img}/>
                    <View style={styles.viewImage}>
                        <Text style={styles.data}>{dayjs(data?.release_date).format("D[ de ]MMM[, ]YYYY")}</Text>
                    </View>
            </TouchableOpacity>
        )
    )
}

export default memo(ListarFilmes)

const { width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    
    bnt: {
        width: (width - 30) / 3,
        height: (height -200) / 3,
        marginHorizontal: 5,
        // backgroundColor: "green"
        // alignItems: "center"
    },
    viewImage: {
        flex: 1,
        justifyContent: "center"
    },

    img: {
        height: "80%"
    },
    data: {
        color: "#C9C9C9",
        fontSize: 12,
    }
})