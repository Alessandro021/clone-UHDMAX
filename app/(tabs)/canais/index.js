import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import LoaderCanais from "../../../src/components/LoaderSkeleton/loaderCanais";

export default function Canais(){
    return (
        <View style={styles.container}>
            {/* <Text>CANAIS</Text>
            <Link href="/home/ver"><Text style={{color: "#FFF"}}>Ver</Text></Link> */}
            <LoaderCanais />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
})