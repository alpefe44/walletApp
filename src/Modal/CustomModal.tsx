import { View, Text, Dimensions, Pressable, TextInput } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Entypo'
import { Colors } from '../Colors';
import { useAppDispatch, useAppSelector } from '../util/Redux/hook';
import { editPrice } from '../util/Redux/pricemanagement';

type Props = {
    isVisible: boolean,
    value: string,
    setValue: (text: string) => void,
    setisVisible: (param: boolean) => void | undefined
}

const { width, height } = Dimensions.get('window');

const CustomModal = (props: Props) => {

    const dispatch = useAppDispatch();

    return (
        <Modal onBackdropPress={() => props.setisVisible(false)} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={2} animationOutTiming={2} isVisible={props.isVisible}>
            <View style={{ backgroundColor: Colors.background2, height: height * .2 }}>
                <Pressable onPress={() => props.setisVisible(false)}>
                    <Text style={{ fontWeight: 'bold', padding: 5 }}>X</Text>
                </Pressable>

                <View style={{ marginHorizontal: 15, alignItems: 'center', gap: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='wallet' size={24} color={'black'} />
                        <TextInput value={props.value} onChangeText={props.setValue} placeholder='Price' keyboardType='number-pad' style={{ paddingHorizontal: 15, borderRadius: 15 }}></TextInput>
                    </View>

                    <Pressable style={{ padding: 8, borderRadius: 15, backgroundColor: Colors.textcolor }} onPress={() => dispatch(editPrice(props.value))}>
                        <Text>Kaydet</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal