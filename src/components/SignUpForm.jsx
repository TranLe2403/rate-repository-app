import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(1, "Must be at least 1 digits")
    .max(30, "Must be not over 30 digits"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "Must be at least 5 digits")
    .max(30, "Must be not over 30 digits"),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  password_confirm: "",
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

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" />
      <FormikTextInput
        name="password_confirm"
        placeholder="password confirmation"
      />
      <Pressable
        style={styles.buttonContainer}
        onPress={onSubmit}
        testID="signup-button-test"
      >
        <Text style={styles.signinText} fontWeight="bold" fontSize="subheading">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewCreationContainer = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await mutate({
        variables: { username, password },
      });
      await signIn({ username, password });

      history.push(`/`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewCreationContainer;
