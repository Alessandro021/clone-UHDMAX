import { Stack } from "expo-router";

export default function AppLayoutScreen(){
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: "Busca", headerShown: false,}}/>
        </Stack>
    )
}