import { React, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as JotaiProvider } from "jotai";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAtom } from "jotai";

import supabase from "./supabase/supabase";
import { sessionAtom, sessionUserAtom } from "./jotai/jotai";
import TabNavigator from "./navigation/tabNavigation";
import LoginStack from "./navigation/routes/loginStack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [session, setSession] = useAtom(sessionAtom);
  const [sessionUser, setSessionUser] = useAtom(sessionUserAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, data) => {
      if (event === 'SIGNED_IN') {
        setSession(data);
        setSessionUser(data.user);
        setIsLoggedIn(true);
      }
    })
  }, [])

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
