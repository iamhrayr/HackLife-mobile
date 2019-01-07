import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';

class AuthLoadingScreen extends React.Component {
    componentWillMount() {
        this._bootstrapAsync();
    }

    render() {
        return <ActivityIndicator size="large" />;
    }

    _bootstrapAsync = async () => {
        // AsyncStorage.clear();
        const token = await AsyncStorage.getItem('token');
        console.log('### token $$$', token);
        this.props.navigation.navigate(token ? 'App' : 'Auth');
    };
}

export default AuthLoadingScreen;
