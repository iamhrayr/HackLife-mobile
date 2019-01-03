import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// screens
import AuthLoadingScreen from './screens/auth/AuthLoading';

// stacks
import AuthStack from './screens/auth';
import TabStack from './screens/tabs';

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: TabStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        },
    ),
);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
