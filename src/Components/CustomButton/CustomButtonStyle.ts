import { StyleSheet } from "react-native"


const base_style = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    text: {
        color: 'lightblue',
        fontWeight: 'bold'
    }
})


export default {
    primary: StyleSheet.create({
        ...base_style,
    }),
    secondary: StyleSheet.create({
        ...base_style,
        button: {
            ...base_style.button,
            backgroundColor: 'lightblue'
        },
        text: {
            ...base_style.text,
            color: 'white'
        }

    })
}