import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';



import styles, { walletScreen } from './HomeScreenStyle'
import { Colors } from '../Colors'
import WalletItem from '../Components/WalletItem'

import data from '../data/data'
import CustomModal from '../Modal/CustomModal'

import { useAppSelector } from '../util/Redux/hook'
import AddModal from '../Modal/AddModal'

type Props = {}

const HomeScreen = (props: Props) => {

    var totalPrice: number = 0;

    // const [wallet , setWallet] = useState<Array<object>>([])


    // const getArray = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem("mywallet");
    //         if (jsonValue !== null) {
    //             setWallet(JSON.parse(jsonValue));
    //             console.log(wallet)
    //         } else {
    //             console.log('Belirtilen anahtarda dizi bulunamadı.');

    //         }
    //     } catch (error) {
    //         console.error('Dizi alma hatası:', error);
    //     }
    // }



    const price = useAppSelector((state) => state.PriceManagement.price)
    const wallet = useAppSelector((state) => state.management.items);
    const walletNames = useAppSelector((state) => state.management.items).map((item) => {
        return item.name
    })
    const newPrices = useAppSelector((state) => state.management.items).map((item) => {
        return item.price
    })

    const [click, setClick] = React.useState<string>("wallet");
    const [visible, setVisible] = React.useState<boolean>(false)
    const [visible2, setVisible2] = React.useState<boolean>(false)
    const [textInputValue, setTextInputValue] = React.useState<string>("")



    function WalletScreen() {
        return (

            <ScrollView showsVerticalScrollIndicator={false} style={walletScreen.container}>

                {
                    wallet.map((item, index) => <WalletItem key={index} isItem={false} item={item}></WalletItem>)
                }



            </ScrollView >

        )
    }

    function ProductScreen() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {
                    data.map((item) => <WalletItem key={item.name} isItem={true} enabledItems={walletNames} item={item}></WalletItem>)
                }
            </ScrollView>
        )
    }


    newPrices.forEach(function (number, index) {
        totalPrice += number;
    })


    return (
        <View style={styles.rootContainer}>
            <View style={styles.priceContainer}>
                <View style={styles.walletContainer}>
                    <Icon name="price-tag" size={24} />
                    <Text style={styles.text}>{totalPrice}₺</Text>
                </View>
                <View style={styles.walletContainer}>
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <Icon name='wallet' size={24} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{price}₺</Text>
                </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={[styles.button, click === 'wallet' ? { backgroundColor: Colors.background2 } : { backgroundColor: Colors.background }, { alignItems: 'center', justifyContent: 'center' }]} onPress={() => { setClick("wallet") }}>
                    <Text style={styles.text}>Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity onLongPress={() => {
                    setVisible2(true)
                }} style={[styles.button, click === 'product' ? { backgroundColor: Colors.background2 } : { backgroundColor: Colors.background }, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]} onPress={() => setClick("product")}>
                    <Text style={styles.text}>Products</Text>
                    <Icon name={"plus"} size={24}></Icon>
                </TouchableOpacity>
            </View>

            {
                click === 'wallet' ? <WalletScreen></WalletScreen> : <ProductScreen></ProductScreen>
            }

            <View style={{ alignSelf: 'center', marginVertical: 15 }}>

            </View>

            <CustomModal value={textInputValue} setValue={setTextInputValue} setisVisible={setVisible} isVisible={visible}></CustomModal>
            <AddModal isVisible={visible2} setIsVisible={setVisible2}></AddModal>
        </View >
    )
}

export default HomeScreen