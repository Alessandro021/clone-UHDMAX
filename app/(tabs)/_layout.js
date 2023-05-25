import { Tabs} from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

export default function AppLayoutTabs(){
    return (
        <Tabs
            screenOptions={{
                headerShown: false,  
                tabBarStyle: {height: 80, backgroundColor: "#121212", paddingBottom: 20, borderTopWidth: 0},
                tabBarActiveTintColor: "#FFFFFF",
                tabBarInactiveTintColor: "#737373",
            }}
        >
            <Tabs.Screen 
            name="home"
            options={{
                // href: "/home",
                title: "Inicio",
                tabBarIcon: ({color, size}) => {return <MaterialCommunityIcons name="home" size={size} color={color} />},
                              
            }}
            />

            <Tabs.Screen 
            name="buscas"
            options={{
                title: "Busca",
                tabBarIcon: ({color, size}) => {return <Feather name="search" size={size} color={color} />}
            }}
            />

            <Tabs.Screen 
            name="filmes"
            options={{
                title: "Filmes",
                tabBarIcon: ({color, size}) => {return <MaterialCommunityIcons name="filmstrip-box" size={size} color={color} />}
            }}
            />

            <Tabs.Screen 
            name="series"
            options={{
                title: "Series",
                tabBarIcon: ({color, size}) => {return <MaterialCommunityIcons name="filmstrip" size={size} color={color} />}
            }}
            />

            <Tabs.Screen 
            name="canais"
            options={{
                title: "Canais",
                tabBarIcon: ({color, size}) => {return <Feather name="tv" size={size} color={color} />}
            }}
            />
        </Tabs>

        
    )
}