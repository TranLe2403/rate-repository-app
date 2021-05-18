import React from "react";
import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ style, title, ...props }) => {
  const textInputStyle = [style];
  return (
    <NativeTextInput
      style={textInputStyle}
      {...props}
      multiline={title === "review" ? true : false}
      numberOfLines={4}
    />
  );
};

export default TextInput;
