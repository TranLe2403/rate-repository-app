import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  signinText: {
    color: theme.colors.white,
    textAlign: "center",
  },
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" />
      <Pressable style={styles.buttonContainer} onPress={onSubmit}>
        <Text style={styles.signinText} fontWeight="bold" fontSize="subheading">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log("Sign in successfully!!", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
