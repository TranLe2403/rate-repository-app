import React from "react";
import { View } from "react-native";

import Text from "./Text";

const Count = ({ text, number }) => {
  let rounded;
  if (number > 1000) {
    rounded = `${(Math.round(number) / 1000).toFixed(1)}k`;
  } else rounded = number;

  return (
    <View>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        testID={`${text}-count-test`}
      >
        {rounded}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export default Count;
