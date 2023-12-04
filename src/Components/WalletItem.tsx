import { View, Text, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { Colors } from '../Colors'
import { useAppDispatch, useAppSelector } from '../util/Redux/hook'
import { addItem, deleteItem } from '../util/Redux/management'
import 'react-native-gesture-handler'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { saveItem } from '../util/DatabaseActions/databaseactions'


type Props = {
    item: any,
    enabledItems: Array<string>,
    isItem: any
}

const WalletItem = (props: Props) => {

    const user = useAppSelector((state) => state.profile.profile)
    const [enabledData, setEnabledData] = React.useState(props.enabledItems)
    const [borderColor, setBorderColor] = React.useState(props.isItem ? 'white' : Colors.background2);
    const [loading, setLoading] = React.useState<boolean>(false)
    const dispatch = useAppDispatch();

    const renderRightActions = () => {
        return (
            <TouchableOpacity style={{ alignSelf: 'center', marginRight: 3 }} onPress={() => dispatch(deleteItem(props.item))}>
                <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff5959', borderRadius: 15 }}>
                    <Icon name="trash" size={24} color="white" />
                </View>
            </TouchableOpacity>
        )

    }

    const saveData = async () => {
        setLoading(true)
        const data = await saveItem({
            id: user.username,
            data: props.item
        })
        setLoading(false)
        setBorderColor('green');


    }

    React.useEffect(() => {
        // Her enabledData değiştiğinde, border rengini güncelle
        setBorderColor(enabledData?.findIndex((item) => item === props.item.name) >= 0 ? 'green' : 'white');
    }, [enabledData, props.item.name]);



    return (

        <GestureHandlerRootView>
            {
                loading ? <ActivityIndicator size={'large'} color={'white'}></ActivityIndicator> : (
                    <Swipeable renderRightActions={props.isItem ? undefined : renderRightActions}>
                        <Pressable onPress={() => {
                            saveData()
                        }} style={{ marginHorizontal: 22, justifyContent: 'space-between', flexDirection: 'row', borderWidth: 5, borderColor: borderColor, padding: 4, backgroundColor: Colors.background2, borderTopLeftRadius: 10, borderBottomRightRadius: 10, marginVertical: 10, elevation: 10 }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <View style={{ width: 80, height: 80 }}>
                                    <Image style={{ flex: 1, resizeMode: 'stretch' }} source={{ uri: props.item.image }}></Image>
                                </View>
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{props.item.name}</Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{props.item.price}₺</Text>
                            </View>
                        </Pressable>
                    </Swipeable>)
            }

        </GestureHandlerRootView>
    )
}

export default WalletItem