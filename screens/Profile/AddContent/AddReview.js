import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

import { screenHeight } from "../../../constants/constants";
import { secondary, tertiary, textPrimary } from "../../../styles/colors/colors";

export default function AddReview() {
  const [searchBarValue, setSearchBarValue] = useState('');

  const updateSearch = (searchBarValue) => {
    setSearchBarValue(searchBarValue);
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.headerText}>New Review</Text>
      <SearchBar
        containerStyle={styles.searchBar}
        inputStyle={{color: textPrimary}}
        autoCorrect={true}
        placeholder='What do you want to review?'
        placeholderTextColor={'lightgray'}
        value={searchBarValue}
        onChangeText={updateSearch}
      ></SearchBar>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: tertiary,
    height: screenHeight
  },
  headerText: {
    textAlign: 'center',
    padding: 10,
    color: secondary,
    fontWeight: '500',
    fontSize: 25
  },
  searchBar: {
    color: textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: textPrimary,
    padding: 50
  }
})