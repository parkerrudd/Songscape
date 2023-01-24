import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { accent, primary } from "../styles/colors/colors";
import HomeStack from "./routes/homeStack";
import SearchStack from "./routes/searchStack";
import ProfileStack from "./routes/profileStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: primary},
        tabBarActiveTintColor: accent
      }}>
      <Tab.Screen 
        name="HomeTab"
        component={HomeStack}
        options={{ headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
          tabBarLabel:() => {return null},
        }}
      />
      <Tab.Screen 
        name="SearchTab"
        component={SearchStack}
        options={{ headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" color={color} size={size} />
          ),
          tabBarLabel:() => {return null},  
        }}
      />
      <Tab.Screen 
        name="ProfileTab"
        component={ProfileStack}
        options={{ headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" color={color} size={size} />
          ),
          tabBarLabel:() => {return null},
        }}
      />
    </Tab.Navigator>
  )
}