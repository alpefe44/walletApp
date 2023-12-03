import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
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
        const saveData = await saveItem({
            id: "kullanici123",
            data: props.item
        })
    }

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={props.isItem ? undefined : renderRightActions}>
                <Pressable onPress={() => {
                    // props.isItem ? dispatch(addItem(props.item)) : undefined
                    saveData()
                }} style={{ marginHorizontal: 22, justifyContent: 'space-between', flexDirection: 'row', borderWidth: 5, borderColor: props.isItem ? props.enabledItems.findIndex((item) => item === props.item.name) >= 0 ? 'green' : 'white' : Colors.background2, padding: 4, backgroundColor: Colors.background2, borderTopLeftRadius: 10, borderBottomRightRadius: 10, marginVertical: 10, elevation: 10 }}>
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
            </Swipeable>
        </GestureHandlerRootView>
    )
}

export default WalletItem