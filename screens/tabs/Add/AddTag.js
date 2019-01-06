import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Item, Input, Label, Icon, Button } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

export default class AddTag extends Component {
    static propTypes = {
        addTag: PropTypes.func.isRequired,
    };

    state = {
        tag: '',
    };

    render() {
        return (
            <>
                <Item style={styles.item}>
                    <Input
                        value={this.state.tag}
                        onChangeText={tag => this.setState({ tag })}
                        onSubmitEditing={this._handleAddTag}
                        placeholder="Add Keyword"
                        returnKeyType="done"
                    />
                    <TouchableOpacity onPress={this._handleAddTag}>
                        <Icon name="plus" type="SimpleLineIcons" />
                    </TouchableOpacity>
                </Item>

                <Text>Add at least 3 tags</Text>
            </>
        );
    }

    _handleAddTag = () => {
        this.props.addTag(this.state.tag);
        this.setState({ tag: '' });
    };
}
