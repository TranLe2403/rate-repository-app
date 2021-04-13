import React from "react";
import { Pressable } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable onPress={() => console.log("click me")}>
      <Link to="/about">
        <Text color="whiteText" fontSize="subheading" fontWeight="bold">
          {tabName}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
