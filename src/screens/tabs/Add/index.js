import React, { Component } from 'react';
import { createBottomTabNavigator, TabNavigator } from 'react-navigation';

// Screens
import TextEditor from './TextEditor';
// import ImageTag from './ImageTag';

const AddHacklifeStack = createBottomTabNavigator(
    {
        TextEditor: {
            screen: TextEditor,
            navigationOptions: ({ navigation }) => ({
                tabBarComponent: props => null,
            }),
        },
        // ImageTag: {
        //     screen: ImageTag,
        // },
        // Add: {
        //     screen: AddScreen,
        //     navigationOptions: ({ navigation }) => ({
        //         tabBarComponent: props => null,
        //     }),
        // },
    },
    {
        initialRouteName: 'TextEditor',
    },
);

export default AddHacklifeStack;

// export { default } from './Add';
