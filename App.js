import { React, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as JotaiProvider } from "jotai";
import { SafeAreaProvider } from "react-native-safe-area-context";

import supabase from "./supabase/supabase";
import TabNavigator from "./navigation/tabNavigation";
import LoginStack from "./navigation/routes/loginStack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      }
    })
  }, [isLoggedIn])

  return (
    <SafeAreaProvider>
      <JotaiProvider>
          <NavigationContainer>
          <Stack.Navigator>
            { !isLoggedIn ? (
              <Stack.Screen
                name="Login"
                component={LoginStack}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Tab"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </JotaiProvider>
    </SafeAreaProvider>
  )
}
