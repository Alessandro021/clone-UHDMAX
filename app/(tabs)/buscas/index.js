import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export default function Busca(){
    return (
        <View style={styles.container}>
            <Text>Busca</Text>
            <Link href="/home/ver"><Text>VER TELA VER</Text></Link>
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