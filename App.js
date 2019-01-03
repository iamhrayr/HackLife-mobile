import React from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, YellowBox, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { StyleProvider } from 'native-base';

import Navigation from './Navigation';

import getTheme from '/native-base-theme/components';
import custom from '/native-base-theme/variables/custom';

YellowBox.ignoreWarnings(['Remote debugger']);

const authLink = setContext(async (req, { headers }) => {
    // AsyncStorage.clear();
    const token = await AsyncStorage.getItem('token');
    return {
        ...headers,
        headers: {
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default class App extends React.Component {
    state = {
        loading: true,
    };

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });
    }

    render() {
        const { loading } = this.state;

        return loading ? (
            <Expo.AppLoading />
        ) : (
            <StyleProvider style={getTheme(custom)}>
                <ApolloProvider client={client}>
                    <Navigation />
                </ApolloProvider>
            </StyleProvider>
        );
    }
}
