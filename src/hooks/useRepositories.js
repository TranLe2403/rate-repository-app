import { GET_REPOSITORIES } from "../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const useRepositories = (orderBy, orderDirection, searchKeyword, first) => {
  const [getRepositories, { loading, data, error, fetchMore }] = useLazyQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  useEffect(() => {
    getRepositories({
      variables: { orderBy, orderDirection, searchKeyword, first },
    });
  }, [orderBy, orderDirection, searchKeyword]);

  return {
    repositories: data?.repositories,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
