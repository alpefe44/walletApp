import { View, Text, TextInput, Button, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Entypo'
import { launchImageLibrary } from 'react-native-image-picker'
import data from '../data/data';




type Props = {
    isVisible: boolean,
    setIsVisible: (param: boolean) => void
}


const { height, width } = Dimensions.get('window');

const AddModal = (props: Props) => {

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
                    priceValue != "0" && selectedImage && nameValue.trim() !== "" ? <Button title="Kaydet" onPress={() => {
                        const numericPrice = parseInt(priceValue)

                        data.filter((item) => {
                            if (item.name === nameValue) {
                                Alert.alert("Aynı Şeyi Ekleyemezsin")
                            }

                            return item.name !== nameValue

                        }).push({
                            name: nameValue,
                            price: numericPrice,
                            image: selectedImage
                        })

                        setNameValue("")
                        setPriceValue("")
                        setSelectedImage(null)

                        props.setIsVisible(false);
                    }}></Button> : null
                }

            </View>
        </Modal>
    )
}

export default AddModal