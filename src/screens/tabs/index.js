import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator, TabNavigator } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';

// Screens
import HomeScreen from './Home';
import SearchScreen from './Search';
import SettingsScreen from './Settings';
import ProfileScreen from './Profile';
import AddScreen from './Add';

const TabStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Search: {
            screen: SearchScreen,
        },
        Settings: {
            screen: SettingsScreen,
        },
        Profile: {
            screen: ProfileScreen,
        },
        Add: {
            screen: AddScreen,
            navigationOptions: ({ navigation }) => ({
                tabBarComponent: props => null,
            }),
        },
    },
    {
        initialRouteName: 'Add',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarComponent: props => (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            // active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate('Home')}
                        >
                            <Icon name="home" type="SimpleLineIcons" />
                            <Text style={styles.buttonText}>Home</Text>
                        </Button>

                        <Button
                            vertical
                            // active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate('Search')}
                        >
                            <Icon name="magnifier" type="SimpleLineIcons" />
                            <Text style={styles.buttonText}>Search</Text>
                        </Button>

                        <Button
                            vertical
                            style={styles.addButton}
                            // active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate('Add')}
                        >
                            <Icon name="ios-add" />
                            {/* <Text style={styles.buttonText}>New</Text> */}
                        </Button>

                        <Button
                            vertical
                            // active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate('Settings')}
                        >
                            <Icon name="wrench" type="SimpleLineIcons" />
                            <Text style={styles.buttonText}>Settings</Text>
                        </Button>

                        <Button
                            vertical
                            // active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate('Profile')}
                        >
                            <Icon name="user" type="SimpleLineIcons" />
                            <Text style={styles.buttonText}>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            ),
        }),
    },
);

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 10,
    },
    addButton: {
        backgroundColor: 'white',
        flex: 0.7,
        marginVertical: 8,
        borderRadius: 100,
    },
});

export default TabStack;
