import { memo } from "react";
import {View,Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, useCallback} from "react-native";
import Play  from '@expo/vector-icons/Ionicons';

 const CardTituloTemporada = ({data}) => {
    // console.log(data.title)
    return(
        <View style={{ flex: 1, marginHorizontal: 20, height: 50, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#FFF" }}>{data.title}</Text>
        </View>
    )
}

export default memo(CardTituloTemporada)


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
})