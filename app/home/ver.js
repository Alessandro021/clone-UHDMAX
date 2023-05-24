import { View, Text, StyleSheet } from "react-native";

export default function Ver(){
    return (
        <View style={styles.container}>
            <Text>Ver</Text>
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