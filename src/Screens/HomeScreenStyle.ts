import { StyleSheet } from "react-native";
import { Colors } from "../Colors";



export default StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },

    priceContainer: {
        padding: 15,
        marginVertical: 20,
        marginHorizontal: 15,
        backgroundColor: Colors.background2,
        borderRadius: 15,
        elevation: 12,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:6,
        justifyContent:'center'

    },

    text: {
        color: 'white',
        fontWeight: 'bold'
    },

    button: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 18
    }
})



export const walletScreen = StyleSheet.create({
    container: {
        flex: 1,
    }
})