import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Title, Icon, Item, Input } from 'native-base';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        // title: 'Home',
        // header: <Header />,
        // tabBarOptions: {
        //     activeTintColor: '#0475f5',
        //     inactiveTintColor: '#bec2cc',
        // },
        // tabBarIcon: ({ focused, horizontal, tintColor }) => {
        //     return <Icon name="list" style={{ color: tintColor }} />;
        // },
    });

    render() {
        return (
            <Container>
                <Header searchBar={true}>
                    {/* <Left>
                        <Text>bbb</Text>
                    </Left> */}
                    <Body>
                        {/* <Title>Hacklives</Title> */}
                        <Item rounded style={{ height: 32 }}>
                            <Input
                                placeholder="Search"
                                onChangeText={() => this.props.navigation.navigate('SearchResult')}
                            />
                            <Icon name="magnifier" type="SimpleLineIcons" style={{ fontSize: 16 }} />
                        </Item>
                    </Body>
                    {/* <Right /> */}
                </Header>
                <Content>
                    <Query query={FETCH_HACKLIVES_QUERY}>
                        {({ data, loading, error }) => (
                            <>
                                <Text>dadadada</Text>
                            </>
                        )}
                    </Query>
                </Content>
            </Container>
        );
    }
}
const FETCH_HACKLIVES_QUERY = gql`
    query fetchHacklives {
        hacklives {
            id
            title
            body
        }
    }
`;

export default Home;
