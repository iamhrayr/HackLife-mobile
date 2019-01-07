import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Form, Item, Input, Label, Button, Icon, Toast } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import validator from 'validator';

import styles from './styles';

class Register extends Component {
    state = {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        formError: {},
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Register',
        header: null,
    });

    render() {
        const { name, email, password, confirmPassword, formError } = this.state;

        return (
            <Container>
                <Content style={styles.container}>
                    <Text style={styles.title}>Create a new account</Text>

                    <Mutation
                        mutation={CREATE_USER}
                        variables={{ email, password, name }}
                        onCompleted={this._handleCreateUserCompleted}
                    >
                        {(createUser, { loading, data }) => (
                            <React.Fragment>
                                <Form>
                                    <Item rounded style={styles.input} error={!!(formError && formError.name)}>
                                        <Icon active style={styles.inputIcon} name="user" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="name"
                                            autoCapitalize="none"
                                            value={name}
                                            onChangeText={value => this._handleInputChange('name', value)}
                                        />
                                    </Item>
                                    <Item rounded style={styles.input} error={!!(formError && formError.email)}>
                                        <Icon active style={styles.inputIcon} name="envelope" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="email"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={value => this._handleInputChange('email', value)}
                                        />
                                    </Item>
                                    <Item rounded style={styles.input} error={!!(formError && formError.password)}>
                                        <Icon active style={styles.inputIcon} name="lock" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="password"
                                            value={password}
                                            onChangeText={value => this._handleInputChange('password', value)}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <Item
                                        rounded
                                        style={styles.input}
                                        error={!!(formError && formError.confirmPassword)}
                                    >
                                        <Icon active style={styles.inputIcon} name="lock" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="confirm password"
                                            value={confirmPassword}
                                            onChangeText={value => this._handleInputChange('confirmPassword', value)}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <Button
                                        primary
                                        block
                                        rounded
                                        large
                                        onPress={() => this._handleCreateUser(createUser)}
                                    >
                                        <Text>Register</Text>
                                    </Button>
                                </Form>
                            </React.Fragment>
                        )}
                    </Mutation>
                </Content>
                <View style={styles.bottomSection}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity
                        style={styles.bottomSectionButton}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={styles.bottomSectionButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }

    _handleInputChange = (key, value) => {
        this.setState(prevState => {
            const formError = Object.assign({}, prevState.formError);
            delete formError[key];

            return {
                [key]: value,
                formError,
            };
        });
    };

    _validate = cb => {
        const { name, email, password, confirmPassword } = this.state;
        const formError = {};
        let isValid = true;

        if (password !== confirmPassword || confirmPassword == '') {
            formError.confirmPassword = 'Confirm Password and Password do not match';
            isValid = false;
        }
        if (validator.isEmpty(password)) {
            formError.password = 'Please enter your password';
            isValid = false;
        }
        if (!validator.isEmail(email)) {
            formError.email = 'Please provide a valid email address';
            isValid = false;
        }
        if (validator.isEmpty(name)) {
            formError.name = 'Name is required';
            isValid = false;
        }

        if (!isValid) {
            this.setState({ formError }, cb(isValid));
        } else {
            this.setState({ formError: {} }, cb(isValid));
        }

        return isValid;
    };

    _handleCreateUser = createUser => {
        this._validate(isValid => {
            if (!isValid) {
                const { formError } = this.state;

                return Object.values(formError).forEach(value => {
                    Toast.show({
                        text: value,
                        buttonText: 'Okay',
                        type: 'danger',
                    });
                });
            }

            createUser();
        });
    };

    _handleCreateUserCompleted = () => {
        this.props.navigation.navigate('Login');
    };
}

const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!, $name: String!) {
        createUser(data: { email: $email, password: $password, name: $name }) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export default Register;
