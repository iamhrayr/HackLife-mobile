import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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
    Footer,
} from 'native-base';
import { RichTextEditor, RichTextToolbar, actions } from 'react-native-zss-rich-text-editor';
import ImagePicker from 'react-native-image-picker';

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
                    {/* <Left /> */}
                    <Body>
                        <Title>Add a new hacklife</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._handleHacklifeSubmit}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button transparent onPress={this._handleHacklifeSubmit}>
                            <Text>Save</Text>
                        </Button>
                    </Right>
                </Header>

                <View style={styles.content}>
                    <Input placeholder="Hacklife Title..." style={styles.title} />
                    <RichTextEditor
                        ref={r => (this.richtext = r)}
                        style={styles.richText}
                        hiddenTitle
                        initialTitleHTML={'Title!!'}
                        initialContentHTML={
                            'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
                        }
                        editorInitializedCallback={() => this.onEditorInitialized()}
                    />

                    {/* <Mutation
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
                    </Mutation> */}
                </View>
                <Footer>
                    <RichTextToolbar
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertOrderedList,
                            actions.insertBulletsList,
                            actions.heading3,
                            actions.setHr,
                            actions.insertImage,
                            actions.insertLink,
                        ]}
                        style={styles.toolbar}
                        renderAction={this._renderToolbarActionButton}
                        getEditor={() => this.richtext}
                        // onPressAddImage={this._handleAddImage}
                    />
                </Footer>
            </Container>
        );
    }

    onEditorInitialized = () => {
        this.setFocusHandlers();
        this.getHTML();
    };

    getHTML = async () => {
        const titleHtml = await this.richtext.getTitleHtml();
        const contentHtml = await this.richtext.getContentHtml();
        //alert(titleHtml + ' ' + contentHtml)
    };

    setFocusHandlers = () => {
        this.richtext.setTitleFocusHandler(() => {
            //alert('title focus');
        });
        this.richtext.setContentFocusHandler(() => {
            //alert('content focus');
        });
    };

    _renderToolbarActionButton = (action, isActive) => {
        buttonStyles = !isActive ? styles.toolbarButton : styles.toolbarButtonActive;
        const iconStyles = !isActive ? styles.toolbarButtonIcon : styles.toolbarButtonActiveIcon;

        switch (action) {
            case actions.setBold:
                return (
                    <Button light onPress={() => this.richtext.setBold()} style={buttonStyles}>
                        <Icon name="format-bold" type="MaterialIcons" style={iconStyles} />
                    </Button>
                );
            case actions.setItalic:
                return (
                    <Button light onPress={() => this.richtext.setItalic()} style={buttonStyles}>
                        <Icon name="format-italic" type="MaterialIcons" style={iconStyles} />
                    </Button>
                );
            case actions.setUnderline:
                return (
                    <Button light onPress={() => this.richtext.setUnderline()} style={buttonStyles}>
                        <Icon name="format-underlined" type="MaterialIcons" style={iconStyles} />
                    </Button>
                );
            case actions.insertOrderedList:
                return (
                    <Button light onPress={() => this.richtext.insertOrderedList()} style={buttonStyles}>
                        <Icon name="format-list-numbers" type="MaterialCommunityIcons" style={iconStyles} />
                    </Button>
                );
            case actions.insertBulletsList:
                return (
                    <Button light onPress={() => this.richtext.insertBulletsList()} style={buttonStyles}>
                        <Icon name="format-list-bulleted" type="MaterialCommunityIcons" style={iconStyles} />
                    </Button>
                );
            case actions.heading3:
                return (
                    <Button light onPress={() => this.richtext.heading3()} style={buttonStyles}>
                        <Icon name="format-title" type="MaterialCommunityIcons" style={iconStyles} />
                    </Button>
                );
            case actions.setHr:
                return (
                    <Button light onPress={() => this.richtext.setHR()} style={buttonStyles}>
                        <Icon name="remove" type="MaterialIcons" style={iconStyles} />
                    </Button>
                );
            case actions.insertImage:
                return (
                    <Button light onPress={() => this._handleAddImage()} style={buttonStyles}>
                        <Icon name="image-filter" type="MaterialCommunityIcons" style={iconStyles} />
                    </Button>
                );
            case actions.insertLink:
            default:
                return (
                    <Button light onPress={() => this.richtext.insertLink()} style={buttonStyles}>
                        <Icon name="link" type="MaterialCommunityIcons" style={iconStyles} />
                    </Button>
                );
        }
    };

    _handleAddImage = a => {
        console.log('image adding', a);

        // const options = {
        //     title: 'Select Avatar',
        //     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images',
        //     },
        // };

        ImagePicker.showImagePicker(response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.richtext.insertImage({
                    src: 'data:image/jpeg;base64,' + response.data,
                });

                // this.setState({
                //     avatarSource: source,
                // });
            }
        });
    };

    _handleHacklifeSubmit = async () => {
        let cont = await this.richtext.getContentHtml();
        console.log('content', cont);
    };

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
