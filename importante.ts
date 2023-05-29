// async function getTemporadas(temporadas) {
//     let cont = 1
//     let array = []
//     while (cont <= temporadas) {
//         const { data } = await api.get(`/tv/${id}/season/${cont}`, {
//             params: {
//                 api_key: "2f80d2c6cee2d978397b2ef6c5ba08a0",
//                 language: "pt-BR",
//             }

//         })
//         array.push(data.episodes)
//         cont++
//     }
//     setTemporadas(array)
//     console.log(array)
// }



// const Temporads = memo(({data}) => {
//     const router = useRouter();
//     // console.log(data)

//     const renderItem = (({item}) => (
//         <View style={styles.container}>
//                 {/* <Text style={styles.data}>{dayjs(data?.release_date).format("D[ de ]MMM[, ]YYYY")}</Text> */}
//                 <Image resizeMode="cover" source={{ uri: `https://image.tmdb.org/t/p/original${item.still_path}` }} style={styles.img}/>
//                 <View style={styles.viewTemEp}>
//                     <Text style={styles.textTemEp}>{item.season_number} - {item.episode_number}</Text>
//                 </View>
//                 <View style={styles.viewTituloEBnt}>
//                     <View style={styles.viewTitulo}>
//                         <Text style={styles.textTitulo}>{item.overview?.slice(0, 15).concat("...")}</Text>
//                         <Text style={styles.textData}>{item.air_date}</Text>
//                     </View>
//                     <Play name="play-circle-outline" size={35} color={"#FFF"} />
//                 </View>
//             </View>
//      ))
//     return(
//         <FlatList 
//             data={data}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//         />
//     )
// })