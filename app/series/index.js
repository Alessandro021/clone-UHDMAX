import { View, Text, StyleSheet } from "react-native";

export default function Series(){
    return (
        <View style={styles.container}>
            <Text>Series</Text>
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