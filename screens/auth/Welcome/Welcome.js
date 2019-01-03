import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

import welcomeImage from "/assets/welcome-img.png";
import styles from "./styles";

export default class Welcome extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    render() {
        return (
            <Container>
                {/* <Header /> */}
                <Content style={styles.container}>
                    <Text style={styles.title}>Welcome to Hacklife</Text>
                    <Text style={styles.subTitle}>Hacklife is an awesome application for sharing with your daily life hacks</Text>

                    <Image source={welcomeImage} style={styles.image}/>

                    <Button 
                        block 
                        rounded 
                        large
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Button>


                </Content>
                <View style={styles.bottomSection}>
                    <Text>Don’t have an acoount?</Text>
                    <TouchableOpacity
                        style={styles.bottomSectionButton}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.bottomSectionButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}
