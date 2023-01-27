import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../../screens/Profile";
import AddReview from "../../screens/AddContent/AddReview";
import AddList from "../../screens/AddContent/AddList";
import AddFavorite from "../../screens/AddContent/AddFavorite";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Add Review" 
        component={AddReview} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Add List" 
        component={AddList} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Add Favorite"
        component={AddFavorite}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}