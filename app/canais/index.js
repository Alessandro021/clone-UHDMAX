import { View, Text, StyleSheet } from "react-native";

export default function Canais(){
    return (
        <View style={styles.container}>
            <Text>CANAIS</Text>
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