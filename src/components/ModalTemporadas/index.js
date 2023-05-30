import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Close from '@expo/vector-icons/AntDesign';

export default function ModalTemporadas({data, onClose, buscaTemporada}){

    function closeModal(){
        onClose()
    }
    return(
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.content}>
                {data?.map((item, index) => {
                    if (index !== 0 || data.length <= 2) {
                        return (
                            <TouchableOpacity style={styles.bntTemporada} key={index} onPress={() => {closeModal(), buscaTemporada(item.season_number)}} >
                                <Text style={styles.textTemporada}>Temporada {item.season_number}</Text>
                            </TouchableOpacity>
                        )
                    }
                })}
            </ScrollView>

            <View style={styles.viewClose}>
                <TouchableOpacity onPress={onClose}>
                    <Close name="closecircle" size={60} color={"#FFF"}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.9)", 
        flex: 1, 
        alignItems: "center",
    },
    content: {
        height: 500,
        marginTop: 200,
    },
    bntTemporada: {
        marginVertical: 10
    },
    textTemporada: {
        color: "#C9C9C9",
        fontSize: 28,
        fontWeight: "400",
    },
    viewClose: {
        marginVertical: 50,
        justifyContent: "center",
        alignItems: "center",
    },
})