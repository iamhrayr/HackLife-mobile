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
    Toast,
    Switch,
} from 'native-base';

import AddTag from './AddTag';
import TagList from './TagList';
import styles from './styles';

class Add extends Component {
    state = {
        title: '',
        body: '',
        tags: [],
        publish: false,
    };

    render() {
        const { title, body, tags, published } = this.state;

        const mutationVariables = {
            title,
            body,
            tags,
            published,
        };

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Add a new hacklife</Title>
                    </Body>
                </Header>

                <Content style={styles.content}>
                    <Mutation
                        mutation={CREATE_HACKLIFE}
                        // refetchQueries={}
                        variables={mutationVariables}
                        onCompleted={this._handleCreateHacklifeCompleted}
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
                                            value={this.state.body}
                                            onChangeText={body => this.setState({ body })}
                                        />
                                    </Item>

                                    <AddTag addTag={this._handleAddTag} />

                                    <TagList tags={this.state.tags} removeTag={this._handleRemoveTag} />
                                    <View>
                                        <Text>Published?</Text>
                                        <Switch
                                            value={this.state.published}
                                            onValueChange={published => this.setState({ published })}
                                        />
                                    </View>
                                </Form>
                                <Button block rounded onPress={() => this._handleCreateHacklife(createHacklife)}>
                                    <Text>Save</Text>
                                </Button>
                            </>
                        )}
                    </Mutation>
                </Content>
            </Container>
        );
    }

    _handleAddTag = tag => {
        const { tags } = this.state;

        if (tags.includes(tag)) {
            return Toast.show({
                text: 'Tag is already added',
                buttonText: 'Okay',
                type: 'danger',
                duration: 3000,
            });
        }

        const tagsTemp = [...tags];
        tagsTemp.push(tag);
        this.setState({ tags: tagsTemp });
    };

    _handleRemoveTag = index => {
        const { tags } = this.state;
        const tagsTemp = [...tags];
        tagsTemp.splice(index, 1);
        this.setState({ tags: tagsTemp });
    };

    _handleCreateHacklife = createHacklife => {
        const { title, body, tags, published } = this.state;
        if (tags.length < 3 || !body || !title) {
            // TODO: change with actual error
            return Toast.show({
                text: 'Some error',
                type: 'danger',
            });
        }
        createHacklife();
    };

    _handleCreateHacklifeCompleted = () => {
        this.props.navigation.navigate('Home');
    };
}

const CREATE_HACKLIFE = gql`
    mutation createHacklife($title: String!, $body: String!, $tags: [String!]!, $published: Boolean!) {
        createHacklife(data: { title: $title, body: $body, tags: $tags, published: $published }) {
            id
            title
            body
        }
    }
`;

export default Add;
