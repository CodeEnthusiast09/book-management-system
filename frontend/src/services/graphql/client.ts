import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import type { GraphQLFormattedError } from "graphql";

// HTTP connection to the GraphQL API
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:4000/graphql",
});

// Error handling link
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((graphQLError: GraphQLFormattedError) => {
      console.error(
        `[GraphQL error]: Message: ${graphQLError.message}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`
      );
    });
  } else {
    console.error(`[Network error]: ${error.message}`);
  }
});

// Create Apollo Client factory function
// This will be called with the Auth0 token
export const createApolloClient = (getAccessToken: () => Promise<string>) => {
  // Auth link to add JWT token to requests
  const authLink = new SetContextLink(async (prevContext) => {
    try {
      const token = await getAccessToken();
      return {
        headers: {
          ...prevContext.headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    } catch (error) {
      console.error("Error getting access token:", error);
      return { headers: prevContext.headers };
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};
