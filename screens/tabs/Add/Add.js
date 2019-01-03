import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Icon,
    Content,
    Form,
    Item,
    Input,
    Label,
    Textarea,
    Button,
} from 'native-base';

class Add extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add',
        tabBarOptions: {
            activeTintColor: '#0475f5',
            inactiveTintColor: '#bec2cc',
        },
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Icon name="list" style={{ color: tintColor }} />;
        },
    });

    state = {
        title: '',
        body: '',
    };

    render() {
        console.log('pppppppppppppp', this.props);
        const mutationVariables = {
            title: this.state.title,
            body: this.state.body,
            authorId: 'cjpu06z0j0rb901821o64fjw5',
        };

        return (
            <Container>
                <Header>
                    {/* <Left /> */}
                    <Body>
                        <Title>Add new hacklife</Title>
                    </Body>
                    <Right />
                </Header>

                <Content style={styles.content}>
                    <Mutation
                        mutation={createHacklife}
                        variables={mutationVariables}
                        onError={e => console.log('error', e)}
                    >
                        {(createHacklife, { loading }) => (
                            <>
                                <Form>
                                    <Item stackedLabel style={styles.item}>
                                        <Label>Title</Label>
                                        <Input
                                            value={this.state.title}
                                            onChangeText={title => this.setState({ title })}
                                        />
                                    </Item>
                                    <Item stackedLabel style={styles.item}>
                                        <Label>Body</Label>
                                        <Textarea
                                            rowSpan={5}
                                            style={styles.textarea}
                                            value={this.state.b}
                                            onChangeText={body => this.setState({ body })}
                                        />
                                    </Item>
                                </Form>
                                <Button success block basic onPress={() => createHacklife()}>
                                    <Text>Save</Text>
                                </Button>
                            </>
                        )}
                    </Mutation>
                </Content>
            </Container>
        );
    }

    _handleTextChange = e => {
        console.log('eeeeeeeee', e);
        console.log('this', this);
    };
}

const styles = StyleSheet.create({
    content: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    item: {
        marginLeft: 0,
    },
    textarea: {
        paddingLeft: 0,
        marginTop: 10,
        alignSelf: 'stretch',
        borderWidth: 0,
    },
});

const createHacklife = gql`
    mutation createHacklife($title: String!, $body: String!, $authorId: ID!) {
        createHacklife(title: $title, body: $body, authorId: $authorId) {
            title
        }
    }
`;

export default Add;
