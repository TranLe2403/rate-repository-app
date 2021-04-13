import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    paddingLeft: 5,
    margin: 5,
    color: "#d73a4a",
  },
  inputContainer: {
    padding: 8,
    borderStyle: "solid",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  inputValid: {
    borderColor: "#d73a4a",
  },
  inputInvalid: {
    borderColor: theme.colors.textSecondary,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[
          styles.inputContainer,
          showError ? styles.inputValid : styles.inputInvalid,
        ]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
