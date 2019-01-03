import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Icon } from 'native-base';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        tabBarOptions: {
            activeTintColor: '#0475f5',
            inactiveTintColor: '#bec2cc',
        },
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Icon name="settings" style={{ color: tintColor }} />;
        },
    });

    render() {
        return (
            <Container>
                <Header />
                <View>
                    <Text> Settings Component !!!</Text>
                </View>
            </Container>
        );
    }
}

export default Home;
