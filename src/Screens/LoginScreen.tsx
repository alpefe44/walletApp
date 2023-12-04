import { View, Text, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../Components/CustomButton/CustomButton';
import { fetchLogin } from '../util/DatabaseActions/databaseactions';
import { useAppDispatch, useAppSelector } from '../util/Redux/hook';
import { addUser } from '../util/Redux/userSlice';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStack } from '../Navigation/Router';

type Props = {}

const { width, height } = Dimensions.get('window');

const LoginScreen = (props: Props) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStack>>()

    const [page, setPage] = React.useState(0);
    const [data, setData] = React.useState<object>({})
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.profile.profile);


    const LoginPage = () => {

        async function handleSubmit(values: any) {

            const response = await fetchLogin({
                username: values.username,
                password: values.password
            })

            if (response) {
                setData(response)
                dispatch(addUser(response))
                navigation.replace('HomeScreen');
            }
        }


        React.useEffect(() => {
            console.log(data, "data")
            console.log(user, "user")
        }, [data, user])


        const [tetik, setTetik] = React.useState(false);
        const [tetik2, setTetik2] = React.useState(false)

        const handleFocus = (val: number) => {
            if (val === 1)
                setTetik(true);
            else {
                setTetik2(true)
            }
        };

        const handleBlur = (val: number) => {
            if (val === 1)
                setTetik(false);
            else {
                setTetik2(false)
            }

        };


        return (
            <View style={{ height: height * .4 }}>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <View style={{ padding: 5, gap: 10 }}>
                            <View style={{ marginHorizontal: 15, paddingHorizontal: 25, borderBottomWidth: 1, position: 'relative', borderBottomColor: tetik ? 'lightblue' : 'white' }}>
                                <TextInput value={values.username} onChangeText={handleChange('username')} cursorColor={'white'} placeholderTextColor={tetik ? 'lightblue' : 'white'} style={{ fontWeight: 'bold' }} placeholder='example@username' onFocus={() => handleFocus(1)} onBlur={() => handleBlur(1)}></TextInput>
                                <View style={{ position: 'absolute', height: '100%', justifyContent: 'center' }}>
                                    <Icon name="email" size={24} color={tetik ? 'lightblue' : 'white'} />
                                </View>
                                <View style={{ position: 'absolute', height: '100%', justifyContent: 'center', right: 0 }}>
                                    <Icon name="check" size={24} color={tetik ? 'lightblue' : 'white'} />
                                </View>

                            </View>
                            <View style={{ marginHorizontal: 15, paddingHorizontal: 25, borderBottomWidth: 1, position: 'relative', borderBottomColor: tetik2 ? 'lightblue' : 'white' }}>
                                <TextInput value={values.password} onChangeText={handleChange('password')} placeholderTextColor={tetik2 ? 'lightblue' : 'white'} style={{ fontWeight: 'bold' }} placeholder='example@username' onFocus={() => handleFocus(0)} onBlur={() => handleBlur(0)}></TextInput>
                                <View style={{ position: 'absolute', height: '100%', justifyContent: 'center' }}>
                                    <Icon name="password" size={24} color={tetik2 ? 'lightblue' : 'white'} />
                                </View>
                                <View style={{ position: 'absolute', height: '100%', justifyContent: 'center', right: 0 }}>
                                    <Icon name="check" size={24} color={tetik2 ? 'lightblue' : 'white'} />
                                </View>
                            </View>
                            <View>
                                <CustomButton theme='secondary' title='Log In' customPress={() => handleSubmit()}></CustomButton>
                                <View style={{ alignSelf: 'center', paddingVertical: 15 }}>
                                    <Text style={{ fontWeight: 'bold' }}>OR</Text>
                                </View>
                                <CustomButton theme='primary' title='Sign Up'></CustomButton>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        )
    }

    return (
        <ImageBackground source={{ uri: 'https://img.freepik.com/free-vector/abstract-blur-pink-blue-gradient-background-design_53876-169254.jpg?w=740&t=st=1701514414~exp=1701515014~hmac=f0ded0451733c849fc17965531a9b6ac89f578748f1fa5b30d50c12be4cee8b6' }} resizeMode='cover' style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: 'flex-start', padding: 10, fontSize: 14, fontWeight: 'bold', color: '#008e80' }}>wallet<Text style={{ fontWeight: 'bold', color: '#29696d', fontSize: 18 }}>APP</Text></Text>
            </View>

            {
                page === 0 ? <LoginPage></LoginPage> :
                    <View style={{ height: height * .3, padding: 10 }}>
                        <View style={{ marginBottom: 20, gap: 10 }}>
                            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Wallet App</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Hesabınızı yapabileceğiniz bir uygulama olan Wallet App'e hoşgeldiniz...</Text>
                        </View>

                        <View style={{ gap: 15 }}>
                            <CustomButton theme='primary' title='Log In'></CustomButton>
                            <CustomButton theme='secondary' title='Sign Up'></CustomButton>
                        </View>
                    </View>
            }

        </ImageBackground>
    )
}

export default LoginScreen