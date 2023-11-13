import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const screenOptions ={
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
        position:"absolute",
        bottom:0,
        right:0, 
        left:0, 
        height:70,
        paddingTop:10
    }
}


const _layout = () => {
  return (
    <Tabs screenOptions={screenOptions}>
        <Tabs.Screen name="categories" options={{
            tabBarIcon: ({focused}) => {
                return (
                    <View style={{
                        alignItems:"center",
                        justifyContent:"center",
                    }}>
                        <FontAwesome name="pencil" size={24} color={focused?"#FFA500":"#111"}/>
                    </View>
                )
            }
        }}/>
        <Tabs.Screen name="home" options={{
            tabBarIcon: ({focused}) => {
                return (
                    <View style={{
                        alignItems:"center",
                        justifyContent:"center",
                    }}>
                        <FontAwesome name="pencil" size={24} color={focused?"#FFA500":"#111"}/>
                    </View>
                )
            }
        }}/>
    </Tabs>
  )
}

export default _layout;