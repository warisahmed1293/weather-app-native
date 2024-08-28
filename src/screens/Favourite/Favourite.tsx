import React, { useCallback, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DropdownMenu from '../../components/DropdownMenu';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../theme';
import { debounce } from 'lodash'
import { fetchCurrentWeather, fetchSearchWeather } from '../../constant/weatherAPI'
import mainBG from '../../assets/mainBG.png'

const Favourite = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [showSearch, toggleSearch] = useState(false);
    const [location, setLocation] = useState([1, 2, 3]);
    const [weather, setWeather] = useState(null); // Set initial state to null

    console.log("Weather", weather);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLocation = (loc) => {
        setLocation([]);
        toggleSearch(false);
        fetchSearchWeather(loc.name).then(
            data => {
                console.log(data);
                setWeather(data); // Set the fetched weather data
            }
        );
    };

    const handleSearch = value => {
        if (value.length > 2) {
            fetchCurrentWeather(value).then(data => {
                setLocation(data);
            });
        }
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 1500), []);

    return (
        <ImageBackground
            blurRadius={50}
            source={mainBG}
            style={{
                flex: 1,
                justifyContent: 'center'
            }}
            resizeMode="cover"
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
                <View style={{ height: 56 }} className='mx-4 relative z-50'>
                    <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                        {showSearch ? (
                            <TextInput
                                onChangeText={handleTextDebounce}  // onChangeText provides the text directly
                                placeholder='Search City'
                                placeholderTextColor={'lightgray'}
                                className='pl-6 h-10 flex-1 text-base text-white'
                            />
                        ) : null}
                        <TouchableOpacity onPress={() => toggleSearch(!showSearch)} style={{ backgroundColor: theme.bgWhite(0.3) }} className='rounded-full p-3 m-1'>
                            <FontAwesome6 name={'magnifying-glass'} size={25} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    {location.length > 0 && showSearch ? (
                        <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                            {location.map((loc, index) => {
                                let showBorder = index + 1 !== location.length;
                                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleLocation(loc)}
                                        key={index}
                                        className={"flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass}
                                    >
                                        <Ionicons name={'location'} color={'gray'} size={20} />
                                        <Text className='text-black text-[17px] ml-2'>
                                            {loc.name}, {loc.country}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ) : null}
                </View>
                <View className="">
                    {/* Display the search result HERE */}
                    {weather && (
                        <View className="">
                            <Text className="text-3xl text-white">{weather.current.condition.text}</Text>
                            <Text className="text-2xl text-white">{weather.current.condition.text}°C</Text>
                            <Text className="text-xl text-white">{weather.current.condition.text}</Text>
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};
export default Favourite;
