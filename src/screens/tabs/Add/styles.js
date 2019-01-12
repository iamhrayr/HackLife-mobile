import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flex: 1,
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
    richText: {
        // height: 400,
        flex: 1,
        // height: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'transparent',
        // borderWidth: 1,
    },
    toolbar: {
        backgroundColor: 'transparent',
    },
    toolbarButtonActive: {
        backgroundColor: '#f8ba2c',
        borderRadius: 0,
    },
    toolbarButton: {
        backgroundColor: 'transparent',
        borderRadius: 0,
    },
    toolbarButtonActiveIcon: {
        color: '#fff',
    },
    toolbarButtonIcon: {
        opacity: 0.7,
    },
    title: {
        fontSize: 22,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: 15,
        marginTop: 5,
        flex: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default styles;
