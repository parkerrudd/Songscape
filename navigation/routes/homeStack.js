import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home/Home";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}