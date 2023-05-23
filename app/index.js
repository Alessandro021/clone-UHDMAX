import { View, Text, StyleSheet, Image, StatusBar, ImageBackground, ScrollView} from "react-native";

import ImageFundo from "../src/assets/filme.jpg"
import Logo from "../src/assets/icon.png"
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";



export default function Home(){
const {bottom, top} = useSafeAreaInsets();

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" translucent={true}/>
            <ImageBackground resizeMode="stretch" source={ImageFundo} style={styles.backgroundImage}>
                {/*HEADER */}
                <View style={[styles.header, {marginTop: top}]}>
                    <View style={styles.viewLogo}>
                        <Image source={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.viewLink}>
                        <Link href="/filmes" ><Text style={styles.link}>Filmes</Text></Link>
                        <Link href="/series" ><Text style={styles.link}>Series</Text></Link>
                        <Link href="/canais" ><Text style={styles.link}>Canais de TV</Text></Link>
                    </View>
                </View>

                <View style={styles.content}>

                </View>
            </ImageBackground>
            <View style={{flex: 1}} >
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    backgroundImage: {
        width: '100%',
        height: 650,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "green",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    viewLogo: {
        width: "20%",
        alignItems: "center"
    },
    viewLink:{
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    
    logo: {
        width: 40,
        height: 50,
    },
    link: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        width: "100%",
        height: 300,
    }
})