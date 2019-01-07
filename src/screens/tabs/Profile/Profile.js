import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Icon } from 'native-base';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        tabBarOptions: {
            activeTintColor: '#e34a85',
            inactiveTintColor: '#bec2cc',
        },
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Icon name="person" style={{ color: tintColor }} />;
        },
    });

    render() {
        return (
            <Container>
                <Header />
                <View>
                    <Text> Profile Component !!!</Text>
                </View>
            </Container>
        );
    }
}

export default Home;
