import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './CustomButtonStyle'

type Props = {
    title: string,
    theme: 'primary' | 'secondary',
    customPress: () => void
}

const CustomButton = (props: Props) => {
    return (
        <>
            <TouchableOpacity style={styles[props.theme].button} onPress={props.customPress}>
                <Text style={styles[props.theme].text}>{props.title}</Text>
            </TouchableOpacity>
        </>
    )
}

export default CustomButton