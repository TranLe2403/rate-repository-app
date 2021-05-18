import React from "react";
import { View, StyleSheet } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import SignUpForm from "./SignUpForm";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route exact path="/">
          <RepositoryList />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/review">
          <ReviewForm />
        </Route>
        <Route exact path="/signup">
          <SignUpForm />
        </Route>

        <Route path="/:id">
          <SingleRepository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
