import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class TagList extends Component {
    static propTypes = {
        tags: PropTypes.array.isRequired,
        removeTag: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View>
                <View style={styles.tags}>{this._renderTags()}</View>
            </View>
        );
    }

    _renderTags = () => {
        const { tags } = this.props;
        // const tags = ['aaaa', 'bbbb', 'cccc', 'eee'];
        if (tags.length === 0) return;

        return tags.map((tag, index) => {
            return (
                <TouchableOpacity style={styles.tag} key={index} onPress={() => this._handleTagRemove(index)}>
                    <Text>{tag}</Text>
                </TouchableOpacity>
            );
        });
    };

    _handleTagRemove = index => {
        this.props.removeTag(index);
    };
}
