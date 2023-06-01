import { Skeleton} from 'moti/skeleton'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

//https://moti.fyi/skeleton
export default function LoaderCanais(){
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;
  return (
    <SafeAreaView style={{flex: 1, alignItems: "center"}}>
      <View style={{alignItems: 'center' }}>
        <Skeleton radius='square' width="95%" height={250} />
      </View>

      <Spacer height={16} />


      <View style={{width: "90%",flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <View style={{flexDirection: "column", alignItems: "center", gap: 5}}>
            <Skeleton radius={100} width={60} height={60} />
            <Skeleton radius="square" width={60} height={10} />
        </View>

        <View style={{flexDirection: "column", alignItems: "center", gap: 5}}>
            <Skeleton radius={100} width={60} height={60} />
            <Skeleton radius="square" width={60} height={10} />
        </View> 
        <View style={{flexDirection: "column", alignItems: "center", gap: 5}}>
            <Skeleton radius={100} width={60} height={60} />
            <Skeleton radius="square" width={60} height={10} />
        </View>
        <View style={{flexDirection: "column", alignItems: "center", gap: 5}}>
            <Skeleton radius={100} width={60} height={60} />
            <Skeleton radius="square" width={60} height={10} />
        </View>  
      </View>

      <Spacer height={16} />

      <View style={{width: "95%",flexDirection: "row", justifyContent: "space-between"}}>
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
      </View>

      <Spacer height={16} />

      <View style={{width: "95%",flexDirection: "row", justifyContent: "space-between"}}>
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
      </View>

       <Spacer height={16} />

      <View style={{width: "95%",flexDirection: "row", justifyContent: "space-between"}}>
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
      </View>


    </SafeAreaView>
  );
};
