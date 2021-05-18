import React from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import theme from "../theme";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repositoryInfoContainer: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  buttonContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },

  buttonTitle: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },

  reviewItemContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: 25,
  },

  reviewText: {
    width: "80%",
    marginTop: 10,
  },

  avatar: {
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    height: 60,
    borderRadius: 30,
    borderColor: theme.colors.primary,
  },
  reviewContent: {
    width: "100%",
    paddingLeft: 10,
  },
  ratingText: {
    color: theme.colors.primary,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  usernameText: {
    fontWeight: "bold",
  },
});

const RepositoryInfo = ({ repository }) => {
  const onPressHandler = (url) => {
    Linking.openURL(url);
  };
  return (
    <View>
      <View style={styles.repositoryInfoContainer}>
        <RepositoryItem item={repository} />
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => onPressHandler(repository.url)}>
            <Text style={styles.buttonTitle}>Open in Github</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  if (!review) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const dateForm = review.createdAt.split("T")[0];
  const day = dateForm.split("-")[0];
  const month = dateForm.split("-")[1];
  const year = dateForm.split("-")[2];
  const newDate = format(new Date(day, month, year), "MM.dd.yyy");

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.avatar}>
        <Text style={styles.ratingText} fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{newDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  let { id } = useParams();
  const { loading, data, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id, first: 2 },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviewNodes = data?.repository.reviews
    ? data?.repository.reviews.edges.map((edge) => edge.node)
    : [];

  const handleOnEndReached = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first: 2,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data?.repository} />
      )}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
