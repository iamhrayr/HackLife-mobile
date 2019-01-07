import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    item: {
        marginLeft: 0,
    },
    textarea: {
        paddingLeft: 0,
        marginTop: 10,
        alignSelf: 'stretch',
        borderWidth: 0,
    },
    tags: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    tag: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 30,
        backgroundColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    // addTagInput: {
    //     marginBottom: 5,
    // },
});

export default styles;
