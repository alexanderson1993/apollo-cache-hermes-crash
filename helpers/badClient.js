import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { Hermes } from "apollo-cache-hermes";

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: `https://graphql-pokemon.now.sh`,
    opts: {
      mode: "cors"
    }
  })
]);

const cache = new Hermes();
const client = new ApolloClient({
  link: httpLink,
  cache
});

export default client;
