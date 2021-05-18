import React from "react";
import { render } from "@testing-library/react-native";

import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const component = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryFullName = component.getAllByTestId("fullname-test");
      const repositoryDescription = component.getAllByTestId(
        "description-test"
      );
      const repositoryLanguage = component.getAllByTestId("language-test");
      const repositoryStar = component.getAllByTestId("Stars-count-test");
      const repositoryFork = component.getAllByTestId("Forks-count-test");
      const repositoryReview = component.getAllByTestId("Reviews-count-test");
      const repositoryRating = component.getAllByTestId("Rating-count-test");

      expect(repositoryFullName[0]).toHaveTextContent("jaredpalmer/formik");
      expect(repositoryFullName[1]).toHaveTextContent(
        "async-library/react-async"
      );

      expect(repositoryDescription[0]).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(repositoryDescription[1]).toHaveTextContent(
        "Flexible promise-based React data loader"
      );

      expect(repositoryLanguage[0]).toHaveTextContent("TypeScript");
      expect(repositoryLanguage[1]).toHaveTextContent("JavaScript");

      expect(repositoryStar[0]).toHaveTextContent("21.9k");
      expect(repositoryStar[1]).toHaveTextContent("1.8k");

      expect(repositoryFork[0]).toHaveTextContent("1.6k");
      expect(repositoryFork[1]).toHaveTextContent("69");

      expect(repositoryReview[0]).toHaveTextContent("3");
      expect(repositoryReview[1]).toHaveTextContent("3");

      expect(repositoryRating[0]).toHaveTextContent("88");
      expect(repositoryRating[1]).toHaveTextContent("72");
    });
  });
});
