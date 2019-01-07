import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    Right,
    Body,
    Card,
    CardItem,
    Icon,
    Item,
    Input,
    Spinner,
    Thumbnail,
    Image,
    Button,
} from 'native-base';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component {
    render() {
        return (
            <Container>
                <Header searchBar={true}>
                    <Body>
                        <Item rounded style={{ height: 32 }}>
                            <Input
                                placeholder="Search"
                                onChangeText={() => this.props.navigation.navigate('SearchResult')}
                            />
                            <Icon name="magnifier" type="SimpleLineIcons" style={{ fontSize: 16 }} />
                        </Item>
                    </Body>
                </Header>
                <Content>
                    <Query query={FETCH_HACKLIVES_FEED} onCompleted={this._handleFetchHacklivesCompleted}>
                        {({ data, loading, error }) => {
                            if (loading) {
                                return <Spinner color="#bdbdbd" />;
                            }

                            if (error) return;

                            if (data.hacklives.length === 0) {
                                return <Text>There is no any hacklife found</Text>;
                            }

                            return data.hacklives.map(hacklife => (
                                <>
                                    {/* <Text key={hacklife.id}>{hacklife.title}</Text> */}
                                    <Card>
                                        <CardItem>
                                            <Body>
                                                <Text>{hacklife.title}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem cardBody>
                                            {/* <Image
                                                source={{ uri: 'Image URL' }}
                                                style={{ height: 200, width: null, flex: 1 }}
                                            /> */}
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Button transparent>
                                                    <Icon active name="thumbs-up" />
                                                    <Text>12 Likes</Text>
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Button transparent>
                                                    <Icon active name="chatbubbles" />
                                                    <Text>4 Comments</Text>
                                                </Button>
                                            </Body>
                                            <Right>
                                                <Text>11h ago</Text>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </>
                            ));
                        }}
                    </Query>
                </Content>
            </Container>
        );
    }
}

const FETCH_HACKLIVES_FEED = gql`
    query {
        hacklives {
            id
            title
            body
        }
    }
`;

export default Home;
