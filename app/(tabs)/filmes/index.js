import { View, Text, StyleSheet } from "react-native";

export default function Filmes(){
    return (
        <View style={styles.container}>
            <Text>FILMES</Text>
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