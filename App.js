import React, { Component, Fragment } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import gql from "graphql-tag";
import { ApolloProvider, withApollo } from "react-apollo";
import ErrorBoundary from "./helpers/errorBoundary";
import goodClient from "./helpers/goodClient";
import badClient from "./helpers/badClient";

const QUERY = gql`
  {
    pokemon(name: "Pikachu") {
      id
      number
      name
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
        }
      }
    }
  }
`;
class Test extends Component {
  state = {};
  runQuery = () => {
    this.setState({ loading: true });
    this.props.client.query({ query: QUERY }).then(res => {
      this.setState({
        results: res,
        loading: false
      });
    });
  };
  render() {
    const { type } = this.props;
    const { results, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {results ? (
          <Text style={{ color: "white" }}>
            Results: {JSON.stringify(results)}
            ...
          </Text>
        ) : loading ? (
          <Text style={{ color: "white" }}>Loading...</Text>
        ) : (
          <Button title={`Run query with ${type}`} onPress={this.runQuery} />
        )}
      </View>
    );
  }
}
const TestData = withApollo(Test);
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text
            style={{
              color: "white",
              flex: 1,
              fontSize: 30,
              textAlign: "center"
            }}
          >
            Apollo Cache Hermes Crash Demo
          </Text>
          <ApolloProvider client={goodClient}>
            <ErrorBoundary>
              <TestData type="Apollo Cache InMemory" />
            </ErrorBoundary>
          </ApolloProvider>
          <ApolloProvider client={badClient}>
            <ErrorBoundary>
              <TestData type="Apollo Cache Hermes" />
            </ErrorBoundary>
          </ApolloProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
    console.log(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111"
  }
});
