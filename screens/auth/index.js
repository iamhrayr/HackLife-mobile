import { createStackNavigator } from 'react-navigation';

// Screens
import LoginScreen from './Login';
import RegisterScreen from './Register';
import WelcomeScreen from './Welcome';

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Register: {
            screen: RegisterScreen,
        },
        Welcome: {
            screen: WelcomeScreen,
        },
    },
    {
        // initialRouteName: 'Welcome',
        initialRouteName: 'Login',
        // mode: 'modal',
    },
);

export default AuthStack;
