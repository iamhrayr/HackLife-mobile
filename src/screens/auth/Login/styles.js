import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingStart: 25,
        paddingEnd: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        marginTop: 120,
        marginBottom: 20,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#8B959A',
        marginBottom: 80,
    },
    bottomSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 35,
    },
    bottomSectionButton: {
        marginLeft: 5,
    },
    bottomSectionButtonText: {
        color: '#F8BA2C',
    },
    input: {
        marginBottom: 15,
        height: 56,
    },
    inputIcon: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 3,
    },
});

export default styles;
