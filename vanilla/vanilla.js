const ApolloClient = apolloClient.default;
const createNetworkInterface = apolloClient.createNetworkInterface;
const gql = graphqlTag.default;

const opts = { uri: 'http://localhost:3456/graphql' }
const networkInterface = createNetworkInterface(opts)
const client = new ApolloClient({
    networkInterface,
});

const query = gql`query {
  allLinks {
      url
    description
  }
}`;

const showResult = (posts) => {
    document.getElementById('result').innerHTML =
        JSON.stringify(posts, null, 2);
};

const observableQuery =
    client.watchQuery({ query, pollInterval: 1000 });
observableQuery.subscribe({
    next: ({ data }) => showResult(data.allLinks),
});

const mutation = gql`mutation ($description: String!){
  createLink(url: "google.com", description: $description) {
    url
    description
  }
}`;

document.getElementById('add').addEventListener('click', () => {
    const description = document.getElementById('description').value;
    client.mutate({ mutation, variables: { description } });
});