import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Canais(){
    return (
        <View style={styles.container}>
            <Text>CANAIS</Text>
            <Link href="/home/ver"><Text style={{color: "#FFF"}}>Ver</Text></Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})