import { Stack } from "expo-router";

export default function AppLayoutScreen(){
    return (
        <Stack screenOptions={{animation: "slide_from_right"}}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
    )
}