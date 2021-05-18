import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().required("Rating is required").integer().min(0).max(100),
});

yup.setLocale({
  mixed: {
    default: "Invalid",
  },
  number: {
    min: ({ min }) => ({ key: `Min is ${min}`, values: { min } }),
    max: ({ max }) => ({ key: `Max is ${max}`, values: { max } }),
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: 0,
  text: "",
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
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 1 and 100" />
      <FormikTextInput name="text" placeholder="Review" />
      <Pressable
        style={styles.buttonContainer}
        onPress={onSubmit}
        testID="create-review-button-test"
      >
        <Text style={styles.signinText} fontWeight="bold" fontSize="subheading">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewCreationContainer = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  let history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    const ratingNumber = Number(rating);

    try {
      var { data } = await mutate({
        variables: { repositoryName, ownerName, ratingNumber, text },
      });
      history.push(`/${data.createReview.repositoryId}`);
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
