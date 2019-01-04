import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Form, Item, Input, Label, Button, Icon, Toast } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles';

class Register extends Component {
    state = {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Register',
        header: null
    });

    render() {
        const { name, email, password, confirmPassword } = this.state;

        return (
            <Container>
                <Content style={styles.container}>
                    <Text style={styles.title}>Create a new account</Text>

                    <Mutation mutation={REGISTER} variables={{ email, password, name }}>
                        {(register, { loading, data }) => (
                            <React.Fragment>
                                <Form>
                                    <Item rounded style={styles.input}>
                                        <Icon active style={styles.inputIcon} name="user" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="name"
                                            value={name}
                                            onChangeText={name => this.setState({ name })}
                                        />
                                    </Item>
                                    <Item rounded style={styles.input}>
                                        <Icon active style={styles.inputIcon} name="envelope" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="email"
                                            value={email}
                                            onChangeText={email => this.setState({ email })}
                                        />
                                    </Item>
                                    <Item rounded style={styles.input}>
                                        <Icon active style={styles.inputIcon} name="lock" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="password"
                                            value={password}
                                            onChangeText={password => this.setState({ password })}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <Item rounded style={styles.input}>
                                        <Icon active style={styles.inputIcon} name="lock" type="SimpleLineIcons" />
                                        <Input
                                            placeholder="confirm password"
                                            value={confirmPassword}
                                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <Button primary block rounded large onPress={() => this._handleRegister(register)}>
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

    _handleRegister = register => {
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            // TODO: show error message
            return null;
        }

        register();
    };
}

const REGISTER = gql`
    mutation register($email: String!, $password: String!, $name: String!) {
        register(data: { email: $email, password: $password, name: $name }) {
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
