import { Stack } from "expo-router";

export default function AppLayoutScreen(){
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="ver"/>
        </Stack>
    )
}