import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DropdownMenu from '../../components/DropdownMenu';
import { theme } from '../../theme';
import { debounce } from 'lodash';
import { fetchCurrentWeather, fetchSearchWeather } from '../../constant/weatherAPI';
import mainBG from '../../assets/mainBG.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cloudy_weather from '../../assets/lottie/cloudy_weather.json';
import partialy_cloudy from '../../assets/lottie/partialy_cloudy.json';
import rain from '../../assets/lottie/rain.json';
import sunny_weather from '../../assets/lottie/sunny weather.json';
import thunder_cloud from '../../assets/lottie/thunder_cloud.json';
import HistoryWeatherCard from '../../components/HistoryWeatherCard';


interface Location {
    name: string;
    country: string;
}

interface Weather {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
}

const weatherAnimations: Record<string, any> = {
    'Moderate or heavy rain with thunder': thunder_cloud,
    'Partly cloudy': partialy_cloudy,
    'Moderate or heavy rain shower': rain,
    'Patchy light drizzle': rain,
    'Sunny': sunny_weather,
    'Patchy rain nearby': rain,
    'Thunderstorm': thunder_cloud,
    'Clear': sunny_weather,
    'Light rain': rain,
    'Cloudy': cloudy_weather,
    'Patchy light rain with thunder': rain,
};

const Favourite = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [showSearch, toggleSearch] = useState(false);
    const [location, setLocation] = useState<Location[]>([]);
    const [weather, setWeather] = useState<Weather | null>(null);
    const [weatherHistory, setWeatherHistory] = useState<Weather[]>([]);

    const clearLocalStorage = async () => {
        try {
            await AsyncStorage.clear();
            setWeatherHistory([]);
            Alert.alert('Success', 'Local storage cleared successfully.');
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    };

    useEffect(() => {
        const getStoredWeather = async () => {
            try {
                const storedWeather = await AsyncStorage.getItem('weatherData');
                const storedHistory = await AsyncStorage.getItem('weatherHistory');
                if (storedWeather) {
                    setWeather(JSON.parse(storedWeather));
                }
                if (storedHistory) {
                    setWeatherHistory(JSON.parse(storedHistory));
                }
            } catch (error) {
                console.error('Error fetching data from storage', error);
            }
        };

        getStoredWeather();
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLocation = async (loc: Location) => {
        try {
            setLocation([]);
            toggleSearch(false);
            const data: Weather = await fetchSearchWeather(loc.name);
            setWeather(data);

            const updatedHistory = weatherHistory.filter(item => item?.location?.name !== loc.name);
            updatedHistory.unshift(data);
            setWeatherHistory(updatedHistory);

            await AsyncStorage.setItem('weatherData', JSON.stringify(data));
            await AsyncStorage.setItem('weatherHistory', JSON.stringify(updatedHistory));
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch weather data');
            console.error('Error fetching weather data', error);
        }
    };

    const handleSearch = (value: string) => {
        if (value.length > 2) {
            fetchCurrentWeather(value).then(data => {
                setLocation(data);
            }).catch(error => {
                Alert.alert('Error', 'Failed to fetch location data');
                console.error('Error fetching location data', error);
            });
        }
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 1500), []);

    return (
        <ImageBackground
            blurRadius={50}
            source={mainBG}
            className="flex-1 justify-center"
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
                <DropdownMenu visible={menuVisible} onClose={() => setMenuVisible(false)} clearStorage={clearLocalStorage} />
                <View style={{ height: 56 }} className='mx-4 relative z-50'>
                    <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                        {showSearch ? (
                            <TextInput
                                onChangeText={handleTextDebounce}
                                placeholder="Search City"
                                placeholderTextColor={'lightgray'}
                                className="pl-6 h-10 flex-1 text-base text-white"
                            />
                        ) : null}
                        <TouchableOpacity onPress={() => toggleSearch(!showSearch)} style={{ backgroundColor: theme.bgWhite(0.3) }} className="rounded-full p-3 m-1">
                            <FontAwesome6 name={'magnifying-glass'} size={25} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    {location.length > 0 && showSearch ? (
                        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                            {location.map((loc, index) => {
                                let showBorder = index + 1 !== location.length;
                                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleLocation(loc)}
                                        key={index}
                                        className={'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass}
                                    >
                                        <Ionicons name={'location'} color={'gray'} size={20} />
                                        <Text className="text-black text-[17px] ml-2">
                                            {loc.name}, {loc.country}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ) : null}
                </View>
                <ScrollView
                    className="mt-6 mb-20 mx-[10]"
                    showsVerticalScrollIndicator={false}
                >
                    {weather && (
                        <HistoryWeatherCard
                            name={weather.location.name}
                            country={weather.location.country}
                            temperature={weather.current.temp_c}
                            condition={weather.current.condition.text}
                            conditionImage={weatherAnimations[weather.current.condition.text] || cloudy_weather}
                        />
                    )}
                    {weatherHistory.length > 0 && (
                        <View>
                            {weatherHistory
                                .filter(record => record.location.name !== weather?.location.name)
                                .map((record, index) => (
                                    <HistoryWeatherCard
                                        key={index}
                                        name={record.location.name}
                                        country={record.location.country}
                                        temperature={record.current.temp_c}
                                        condition={record.current.condition.text}
                                        conditionImage={weatherAnimations[record.current.condition.text] || cloudy_weather}
                                    />
                                ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default Favourite;
