import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { fetchItems } from '../util/Redux/apiSlice'



import styles, { walletScreen } from './HomeScreenStyle'
import { Colors } from '../Colors'
import WalletItem from '../Components/WalletItem'

import data from '../data/data'
import CustomModal from '../Modal/CustomModal'

import { useAppDispatch, useAppSelector } from '../util/Redux/hook'
import AddModal from '../Modal/AddModal'
import { getItems } from '../util/DatabaseActions/databaseactions'
import { setItem } from '../util/Redux/management'
import { editPrice, editTotalPrice } from '../util/Redux/pricemanagement'



const HomeScreen = () => {

    const dispatch = useAppDispatch();
    const [click, setClick] = React.useState<string>("wallet");

    const [visible, setVisible] = React.useState<boolean>(false)
    const [visible2, setVisible2] = React.useState<boolean>(false)
    const [textInputValue, setTextInputValue] = React.useState<string>("")

    const user = useAppSelector((state) => state.profile.profile);
    const dataList = useAppSelector((state) => state.data.data);
    const price = useAppSelector((state) => state.PriceManagement.price)
    const totalPrice = useAppSelector((state) => state.PriceManagement.totalPrice)
    const [deneme, setDeneme] = React.useState(0)



    function WalletScreen() {


        const [loading, setLoading] = React.useState(false)
        const newTry = useAppSelector((state) => state.api.items)
        const totalPrice = newTry.map((item) => item.price);

        React.useEffect(() => {
            const getData = async () => {
                try {
                    setLoading(true);
                    await dispatch(fetchItems(user.username))
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
            getData();
        }, []); // useEffect bağımlılıkları eklenmeli

        return (

            <ScrollView showsVerticalScrollIndicator={false} style={walletScreen.container}>
                {
                    loading ? <ActivityIndicator size={'large'} color={'white'}></ActivityIndicator> : newTry?.map((item: any, index: any) => <WalletItem key={index} isItem={false} item={item}></WalletItem>)

                }
            </ScrollView >

        )
    }

    function ProductScreen() {
        const walletNames = useAppSelector((state) => state.api.items).map((item) => {
            return item.name
        })
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {
                    dataList.map((item) => <WalletItem key={item.name} isItem={true} enabledItems={walletNames} item={item}></WalletItem>)
                }
            </ScrollView>
        )
    }



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