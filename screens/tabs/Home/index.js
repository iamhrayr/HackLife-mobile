import { createStackNavigator } from 'react-navigation';

// screens
import Home from './Home';
import SearchResult from './SearchResult';

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        SearchResult: {
            screen: SearchResult,
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            header: null,
        },
    },
);

export default HomeStack;
