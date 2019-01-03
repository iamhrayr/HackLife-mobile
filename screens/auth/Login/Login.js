import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import styles from "./styles";

class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        header: null
        // header: (
        //     <Header>
        //         <Left>
        //             <Button transparent onPress={() => navigation.goBack()}>
        //                 <Icon name="arrow-back" />
        //             </Button>
        //         </Left>
        //         <Body>
        //             <Title>EditScreenOne</Title>
        //         </Body>
        //         <Right />
        //     </Header>
        // ),
    });

    render() {
        const { email, password } = this.state;

        return (
            <Container>
                <Content style={styles.container}>
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.subTitle}>Please Sign in to enter into application</Text>
                    <Mutation
                        mutation={SIGNIN_USER}
                        variables={{ email, password }}
                        onCompleted={this._handleSigninCompleted}
                        onError={this._handleSigninError}
                    >
                        {(signinUser, { loading, data }) => (
                            <>
                                <Form>
                                    <Item rounded style={styles.input}>
                                        <Icon active style={styles.inputIcon} name='envelope' type='SimpleLineIcons' />
                                        <Input
                                            placeholder="Email"
                                            value={email} 
                                            onChangeText={email => this.setState({ email })} 
                                        />
                                    </Item>
                                    <Item rounded style={styles.input}>
                                        <Icon active style={styles.inputIcon} name='lock' type='SimpleLineIcons' />
                                        <Input
                                            placeholder="Password"
                                            value={password}
                                            onChangeText={password => this.setState({ password })}
                                            secureTextEntry
                                        />
                                    </Item>
                                </Form>
                                <Button
                                    primary 
                                    block 
                                    rounded
                                    large
                                    onPress={() => signinUser()}
                                >
                                    <Text>Login</Text>
                                </Button>
                            </>
                        )}
                    </Mutation>
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

    _handleSigninCompleted = async res => {
        const token = res.signinUser.token;
        await AsyncStorage.setItem('token', token);
        this.props.navigation.navigate('App');
    };

    _handleSigninError = e => {
        console.log('error', e);
    };
}

const SIGNIN_USER = gql`
    mutation signinUser($email: String!, $password: String!) {
        signinUser(email: { email: $email, password: $password }) {
            token
        }
    }
`;

export default Login;
