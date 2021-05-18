import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useHistory } from "react-router-native";
import { Searchbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({ setTextSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const onChangePress = () => {
    console.log("clicked");
    setTextSearch(searchQuery);
  };
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
      onIconPress={onChangePress}
    />
  );
};

let menuTitle = "Latest repositories";

const SortRepositories = ({ setOrder, setDirection }) => {
  const [visibleTitle, setVisibleTitle] = useState(menuTitle);

  const handleMenuItemPressed = (menuTitle) => {
    let order = "CREATED_AT";
    let direction = "DESC";
    switch (menuTitle) {
      case "Latest repositories":
        order = "CREATED_AT";
        direction = "DESC";
        break;
      case "Highest rated repositories":
        order = "RATING_AVERAGE";
        direction = "DESC";
        break;
      case "Lowest rated repositories":
        order = "RATING_AVERAGE";
        direction = "ASC";
        break;
      default:
        break;
    }
    setOrder(order);
    setDirection(direction);
  };

  return (
    <Picker
      selectedValue={visibleTitle}
      onValueChange={(itemValue) => {
        menuTitle = itemValue;
        setVisibleTitle(menuTitle);
        handleMenuItemPressed(itemValue);
      }}
      style={{
        height: 50,
      }}
    >
      <Picker.Item label="Latest repositories" value="Latest repositories" />
      <Picker.Item
        label="Highest rated repositories"
        value="Highest rated repositories"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="Lowest rated repositories"
      />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOrder,
  setDirection,
  setTextSearch,
  textSearch,
  onEndReached,
}) => {
  const history = useHistory();

  const onPressHandler = (item) => {
    history.push(`${item.id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const RepositoryRenderItem = ({ item }) => (
    <Pressable onPress={() => onPressHandler(item)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryRenderItem}
      keyExtractor={({ id }) => id}
      testID="repository-list-test"
      ListHeaderComponent={() => (
        <View style={{ paddingTop: 20 }}>
          <SearchBar setTextSearch={setTextSearch} textSearch={textSearch} />
          <SortRepositories setOrder={setOrder} setDirection={setDirection} />
        </View>
      )}
      ListHeaderComponentStyle={{ zIndex: 2 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState();
  const [direction, setDirection] = useState();
  const [textSearch, setTextSearch] = useState();

  const { repositories, fetchMore } = useRepositories(
    order,
    direction,
    textSearch,
    8
  );

  const onEndReached = () => {
    fetchMore();
    console.log("You have reached the end of the list");
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrder={setOrder}
      setDirection={setDirection}
      setTextSearch={setTextSearch}
      textSearch={textSearch}
      onEndReached={onEndReached}
    />
  );
};

export default RepositoryList;
