import { React, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as JotaiProvider, useAtom } from "jotai";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <JotaiProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={SignIn}
            />
          <Stack.Screen
            name="Create Account"
            component={SignUp}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
          </Stack.Navigator>
        </NavigationContainer>
      </JotaiProvider>
    </SafeAreaProvider>
  )
}
