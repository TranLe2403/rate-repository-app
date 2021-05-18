import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";

const styles = StyleSheet.create({
  linkMargin: {
    marginRight: 20,
  },
});

const AppBarTab = ({ tabName, linkto }) => {
  return (
    <Pressable onPress={() => console.log("click me")}>
      <Link to={linkto}>
        <Text
          color="whiteText"
          fontSize="subheading"
          fontWeight="bold"
          style={styles.linkMargin}
        >
          {tabName}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
