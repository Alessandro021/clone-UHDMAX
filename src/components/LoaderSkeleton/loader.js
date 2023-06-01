import { Skeleton} from 'moti/skeleton'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

//https://moti.fyi/skeleton
export default function LoaderPlacerolder(){
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;
  return (
    <SafeAreaView style={{flex: 1, alignItems: "center"}}>
      <View style={{alignItems: 'center' }}>
        <Spacer height={4*16} />
        <Skeleton radius='square' width="95%" height={400} />
      </View>

      <Spacer height={16} />

      <View style={{width: "80%",flexDirection: "row", justifyContent: "space-between"}}>
        <Skeleton radius='square' width={90} height={40} />
        <Skeleton radius='square' width={90} height={40} />
        <Skeleton radius='square' width={90} height={40} />
      </View>

      <Spacer height={16} />

      <View style={{width: "90%",flexDirection: "row", justifyContent: "space-between"}}>
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
      </View>

      <Spacer height={16} />

      <View style={{width: "90%",flexDirection: "row", justifyContent: "space-between"}}>
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
        <Skeleton radius='square' width={130} height={180} />
      </View>

    </SafeAreaView>
  );
};
