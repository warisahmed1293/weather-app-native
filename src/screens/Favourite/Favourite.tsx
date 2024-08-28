import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownMenu from '../../components/DropdownMenu';
import LinearGradient from 'react-native-linear-gradient';
import { BoxShadow } from 'react-native-shadow';

const Favourite = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [onChangeText, setOnChangeText] = useState('');

    console.log(onChangeText);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Define shadow properties
    const shadowOpt = {
        width: 320, // Adjust the width as necessary
        height: 0, // Adjust the height as necessary
        color: "#000", // Shadow color
        border: 35, // Shadow blur radius
        opacity: 0.2, // Shadow opacity
        x: 0, // Horizontal offset
        y: 32, // Vertical offset

    };

    return (
        <LinearGradient
            colors={['#3A4177', '#1C1B33']} // Define your gradient colors
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            <View className="flex-1 pt-12">
                <View className="flex-row justify-between items-center px-2">
                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => navigation.navigate('Home')}>
                        <Ionicons name={'chevron-back-outline'} color={'lightgrey'} size={25} />
                        <Text className="ml-2 text-white text-xl">Weather</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 rounded-full" onPress={toggleMenu}>
                        <Text className="text-[30px] text-white">⋮</Text>
                    </TouchableOpacity>
                </View>
                <DropdownMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

                {/* Positioned TextInput */}
                <View className="mb-5 justify-between items-center">
                    <BoxShadow setting={shadowOpt}>
                        <TextInput
                            placeholder='Search for a city or airport'
                            onChangeText={setOnChangeText}
                            placeholderTextColor='#fff'
                            className='m-[12px] w-[320px] h-[40px] p-[10px] bg-[#3a2769] text-white rounded-lg mx-auto' // Centering the input
                        />
                    </BoxShadow>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Favourite;
