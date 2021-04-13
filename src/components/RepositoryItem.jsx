import React from "react";
import { View, Image, StyleSheet } from "react-native";

import theme from "../theme";
import Text from "./Text";
import Count from "./Count";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: theme.colors.white,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 5,
  },
  details: {
    height: 60,
    justifyContent: "space-evenly",
    paddingLeft: 10,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  descriptionBox: {
    width: 250,
    justifyContent: "center",
  },

  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    maxWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.white,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },

  countContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Image
          style={styles.image}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View>
          <View style={styles.details}>
            <Text fontWeight="bold">{item.fullName}</Text>
            <View style={styles.descriptionBox}>
              <Text>{item.description}</Text>
            </View>
          </View>
          <View style={styles.languageTag}>
            <Text color="whiteText">{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.countContainer}>
        <Count text="Stars" number={item.stargazersCount} />
        <Count text="Forks" number={item.forksCount} />
        <Count text="Reviews" number={item.reviewCount} />
        <Count text="Rating" number={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
