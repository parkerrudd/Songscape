import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { accent, tertiary, textPrimary } from "../../styles/colors/colors";
import ReviewsTab from "./Tabs/ReviewsTab";
import ListsTab from "./Tabs/ListsTab";
import FavoritesTab from "./Tabs/FavoritesTab";
import { screenHeight, screenWidth } from "../../constants/constants";

export default function TabsParent() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
    { key: 'first', icon: 'ios-star' },
    { key: 'second', icon: 'ios-list' },
    { key: 'third', icon: 'ios-heart' }
  ]);

  const renderScene = SceneMap({
    first: ReviewsTab,
    second: ListsTab,
    third: FavoritesTab
  }); 
  
  const renderIcon = ({ route, focused }) => {
    return (
      <Ionicons
        name={route.icon}
        size={24}
        color={focused ? textPrimary : 'gray'}
        key={route.key}
      />
    );
};
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      renderIcon={renderIcon}
    />
  );


  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{backgroundColor: accent }}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: accent,
    marginTop: 10
  },
  tabBar: {
    backgroundColor: tertiary,
  },
  indicator: {
    backgroundColor: textPrimary
  }
})