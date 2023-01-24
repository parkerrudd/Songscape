import { createStackNavigator } from "@react-navigation/stack";
import Search from "../../screens/Search/Search";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Search" 
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}