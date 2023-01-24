import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../../screens/Profile";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}