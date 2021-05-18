import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import Text from "./Text";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

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
  barTabContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
  },
  viewMarginRight: {
    marginRight: 20,
  },
  subTabsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const apolloClient = useApolloClient();

  useEffect(() => {
    console.log("data here: ", data);
  }, [data]);

  const signoutHandler = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <View style={styles.barTabContainer}>
          <AppBarTab tabName="Repositories" linkto="/" />
          {data?.authorizedUser !== null ? (
            <AppBarTab tabName="Create a review" linkto="/review" />
          ) : (
            <AppBarTab tabName="Sign Up" linkto="/signup" />
          )}
        </View>
        {data?.authorizedUser !== null ? (
          <Pressable onPress={signoutHandler}>
            <Text color="whiteText" fontSize="subheading" fontWeight="bold">
              Sign Out
            </Text>
          </Pressable>
        ) : (
          <View style={styles.viewMarginRight}>
            <Link to="/signin">
              <Text color="whiteText" fontSize="subheading" fontWeight="bold">
                Sign In
              </Text>
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
