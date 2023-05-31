import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import Close from '@expo/vector-icons/AntDesign';

export default function ModalFilmesOuSeries({data, onClose, getResponse}){

    function closeModal(){
        onClose()
    }
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={"#000000"} />
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.content}>
                {data?.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.bntTemporada} key={index} onPress={() => {closeModal(), getResponse({titulo: item.name, link: item.link})}} >
                                <Text style={styles.textTemporada}>{item.name}</Text>
                            </TouchableOpacity>
                        )
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
        textAlign: "center"
    },
    viewClose: {
        marginVertical: 50,
        justifyContent: "center",
        alignItems: "center",
    },
})