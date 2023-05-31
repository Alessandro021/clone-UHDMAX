import { Skeleton} from 'moti/skeleton'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

//https://moti.fyi/skeleton
export default function LoaderPlacerolder(){
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{width: "100%", height: 80, alignItems: "center", marginVertical: 20}}>
          <Skeleton height={100} width={400}/>
        </View>
    </SafeAreaView>
  );
};
