import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Title, Icon, Item, Input, Button } from 'native-base';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class SearchResult extends Component {
    render() {
        return (
            <Container>
                <Header searchBar={true}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent warning onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-left" type="Octicons" style={{ fontSize: 24 }} />
                            {/* <Icon name="arrow-left" type="SimpleLineIcons" style={{ fontSize: 16 }} /> */}
                        </Button>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Item rounded style={{ height: 32 }}>
                            <Input placeholder="Search" />
                            <Icon name="magnifier" type="SimpleLineIcons" style={{ fontSize: 16 }} />
                        </Item>
                    </Body>
                    {/* <Right>
                        <Icon name="md-rose" />
                    </Right> */}
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

export default SearchResult;
