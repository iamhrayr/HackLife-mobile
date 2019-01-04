import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Form, Item, Input, Label, Button, Icon, Toast } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// import LOGIN from "./login.graphql";
import styles from "./styles";

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: null,
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        header: null
    });

    render() {
        const { email, password } = this.state;

        return (
            <Container>
                <Content style={styles.container}>
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.subTitle}>Please Sign in to enter into application</Text>

                    <Mutation
                        mutation={LOGIN}
                        variables={{ email, password }}
                        onCompleted={this._handleLoginCompleted}
                        onError={this._handleLoginError}
                    >
                        {(login, { loading, data, error }) => {
                            return (
                            <>
                                <Form>
                                    <Item rounded style={styles.input}>
                                        <Icon
                                            active 
                                            style={styles.inputIcon}
                                            name='envelope'
                                            type='SimpleLineIcons' 
                                        />
                                        <Input
                                            placeholder="Email"
                                            value={email} 
                                            onChangeText={email => this.setState({ email })} 
                                        />
                                    </Item>
                                    <Item rounded style={styles.input}>
                                        <Icon
                                            active
                                            style={styles.inputIcon}
                                            name='lock'
                                            type='SimpleLineIcons'
                                        />
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
                                    disabled={loading}
                                    onPress={() => this._handleLogin(login)}
                                >
                                    <Text>Login</Text>
                                </Button>
                            </>
                        )}}
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

    _handleLogin = (login) => {
        const { email, password} = this.state;
        if (email && password) {
            
        }
    }

    _handleLoginCompleted = async res => {
        const token = res.login.token;
        await AsyncStorage.setItem('token', token);
        this.props.navigation.navigate('App');
    };

    _handleLoginError = (error) => {
        error.graphQLErrors.map(({ message }) => {
            Toast.show({
                text: message,
                buttonText: "Okay",
                type: "danger",
                duration: 4000
            })
        });
    };
}

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export default Login;
