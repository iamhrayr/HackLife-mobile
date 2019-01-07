import React, { Component } from 'react';
import { AsyncStorage, View, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Form, Item, Input, Label, Button, Icon, Toast } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import validator from 'validator';

// import LOGIN from "./login.graphql";
import styles from './styles';

class Login extends Component {
    state = {
        email: '',
        password: '',
        formError: {},
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        header: null,
    });

    componentDidUpdate() {
        const { formError } = this.state;
        if (formError) {
            Object.values(formError).forEach(value => {
                Toast.show({
                    text: value,
                    buttonText: 'Okay',
                    type: 'danger',
                });
            });
        }
    }

    render() {
        const { email, password, formError } = this.state;

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
                                <React.Fragment>
                                    <Form>
                                        <Item rounded style={styles.input} error={!!formError.email}>
                                            <Icon
                                                active
                                                style={styles.inputIcon}
                                                name="envelope"
                                                type="SimpleLineIcons"
                                            />
                                            <Input
                                                placeholder="Email"
                                                value={email}
                                                autoCapitalize="none"
                                                onChangeText={email => {
                                                    this.setState({ email });
                                                    this.setState({ formError: {} });
                                                }}
                                            />
                                        </Item>
                                        <Item rounded style={styles.input} error={!!formError.password}>
                                            <Icon active style={styles.inputIcon} name="lock" type="SimpleLineIcons" />
                                            <Input
                                                placeholder="Password"
                                                value={password}
                                                onChangeText={password => {
                                                    this.setState({ password });
                                                    this.setState({ formError: {} });
                                                }}
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
                                </React.Fragment>
                            );
                        }}
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

    _validate = () => {
        const { email, password } = this.state;
        const formError = {};
        let isValid = true;

        if (!validator.isEmail(email)) {
            formError.email = 'Please provide a valid email address';
            isValid = false;
        }
        if (validator.isEmpty(password)) {
            formError.password = 'Please enter your password';
            isValid = false;
        }

        if (!isValid) {
            this.setState({ formError });
        } else {
            this.setState({ formError: {} });
        }

        return isValid;
    };

    _handleLogin = login => {
        const isValid = this._validate();

        if (!isValid) {
            return;
        }

        login();
    };

    _handleLoginCompleted = async res => {
        const token = res.login.token;
        await AsyncStorage.setItem('token', token);
        this.props.navigation.navigate('App');
    };

    _handleLoginError = error => {
        error.graphQLErrors.map(({ message }) => {
            Toast.show({
                text: message,
                buttonText: 'Okay',
                type: 'danger',
                duration: 4000,
            });
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
