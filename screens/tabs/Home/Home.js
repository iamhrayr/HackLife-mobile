import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Icon } from 'native-base';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        tabBarOptions: {
            activeTintColor: '#0475f5',
            inactiveTintColor: '#bec2cc',
        },
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Icon name="list" style={{ color: tintColor }} />;
        },
    });

    render() {
        return (
            <Container>
                <Header />
                <View>
                    <Text> Home Component !!!</Text>
                </View>
            </Container>
        );
    }
}

export default Home;
