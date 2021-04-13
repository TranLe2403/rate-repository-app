import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    height: 100,
    backgroundColor: theme.backgroundColor.bgPrimary,
  },
  scrollView: {
    alignItems: "center",
  },
  viewMarginRight: {
    marginRight: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <View style={styles.viewMarginRight}>
          <AppBarTab tabName="Repositories" />
        </View>
        <View style={styles.viewMarginRight}>
          <Link to="/signin">
            <Text color="whiteText" fontSize="subheading" fontWeight="bold">
              Sign In
            </Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
