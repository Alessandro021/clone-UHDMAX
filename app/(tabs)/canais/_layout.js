import { Stack } from "expo-router";

export default function AppLayoutScreen(){
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}