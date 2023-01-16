
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
