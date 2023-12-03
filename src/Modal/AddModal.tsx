import { View, Text, TextInput, Button, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Entypo'
import { launchImageLibrary } from 'react-native-image-picker'
import data from '../data/data';
import { useAppSelector, useAppDispatch } from '../util/Redux/hook'
import { addData } from '../util/Redux/dataSlice';


type Props = {
    isVisible: boolean,
    setIsVisible: (param: boolean) => void
}


const { height, width } = Dimensions.get('window');

const AddModal = (props: Props) => {

    const dispatch = useAppDispatch();
    const dataList = useAppSelector((state) => state.data.data);
    console.log(dataList)

    const [nameValue, setNameValue] = useState<string>("")
    const [priceValue, setPriceValue] = useState<string>("")

    const [selectedImage, setSelectedImage] = React.useState<any>(null);

    const openGallery = async () => {
        const result = await launchImageLibrary()
        console.log(result.assets[0].uri)
        setSelectedImage(result.assets[0].uri)
    }


    return (
        <Modal isVisible={props.isVisible} onBackdropPress={() => {
            props.setIsVisible(false)
        }} >
            <View style={{ height: height * .1, backgroundColor: 'white', justifyContent: 'center' }}>
                <View style={{ marginHorizontal: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => openGallery()}>
                        <Icon name={"camera"} size={22} color={'black'}></Icon>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput value={nameValue} onChangeText={(text) => setNameValue(text)} placeholder='Product Name' keyboardType='default'></TextInput>
                        <TextInput value={priceValue} onChangeText={(text) => setPriceValue(text)} placeholder='Price' keyboardType='numeric'></TextInput>
                    </View>
                </View>
                {
                    priceValue != "" && nameValue.trim() !== "" ? <Button title="Kaydet" onPress={() => {
                        const numericPrice = parseInt(priceValue)

                        const hasDuplicate = dataList.some(
                            (item) => item.name.toLowerCase() === nameValue.toLowerCase()
                        );

                        if (hasDuplicate) {
                            Alert.alert('Aynı Şeyi Ekleyemezsin');
                        } else {
                            // Redux store'u kullanarak veriyi güncelle
                            dispatch(
                                addData({
                                    name: nameValue,
                                    price: numericPrice,
                                    image: selectedImage ? selectedImage : "https://p1.hiclipart.com/preview/658/470/455/krzp-dock-icons-v-1-2-empty-grey-empty-text-png-clipart.jpg",
                                })
                            );

                            setNameValue('');
                            setPriceValue('');
                            setSelectedImage(null);
                            console.log(dataList);
                            props.setIsVisible(false);
                        }
                    }}></Button> : null
                }

            </View>
        </Modal>
    )
}

export default AddModal