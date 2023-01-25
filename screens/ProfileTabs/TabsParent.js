import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { accent, tertiary, textPrimary } from "../../styles/colors/colors";
import ReviewsTab from "./Tabs/ReviewsTab";
import ListsTab from "./Tabs/ListsTab";
import FavoritesTab from "./Tabs/FavoritesTab";
import { Ionicons } from "@expo/vector-icons";

  export default function Reviews() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
    { key: 'first', title: 'Reviews' },
    { key: 'second', title: 'Lists' },
    { key: 'third', title: 'Favorites' },
  ]);

  const renderScene = SceneMap({
    first: ReviewsTab,
    second: ListsTab,
    third: FavoritesTab,
  }); 

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
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
    width: '100%',
    height: '100%',
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