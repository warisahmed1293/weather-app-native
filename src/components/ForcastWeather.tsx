// components/ForcastWeather.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ImageBackground, Dimensions } from 'react-native';
import HalfScreenModal from './HalfScreenModal';
import { Location } from '../constant/Location';
import backgroundImage from '../assets/mainBG.png'


const { height } = Dimensions.get('window');

const ForcastWeather = () => {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);


    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            try {
                const loc = await Location();
                if (loc) {
                    setLocation(loc);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                Alert.alert('Error', err);
                setLoading(false);
            }
        };

        fetchLocationAndWeather();
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (location) {
                const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location.coords.latitude},${location.coords.longitude}&days=3`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '2012511afemsh6fa70ebe74304ebp1e9cf6jsne8ccdffbd331',
                        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
                    },
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    setForecast(result);
                } catch (error) {
                    Alert.alert('Error', 'Failed to fetch weather data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchWeather();
    }, [location]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (

        <HalfScreenModal data={forecast} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontFamily: 'Product Sans Infanity',
    },
    bottomContainer: {
        height: height * 0.45,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        elevation: 10,
        overflow: 'hidden',

    },
    backgroundImage: {
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        overflow: 'hidden',
    },
    gradient: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    touchable: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: 'condensedBold',
        color: '#fff',
        fontFamily: 'Product Sans Infanity',
    },
    forecastContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    forecastItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#48319d',
        height: 150,
        width: 60,
        borderRadius: 100,
        elevation: 10,
    },
    date: {
        color: '#fff',
        fontFamily: 'Product Sans Infanity',
        fontWeight: 'bold',
    },
    temp: {
        color: '#fff',
        fontFamily: 'Product Sans Infanity',
        marginTop: 10,
    },
    condition: {
        color: '#fff',
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 20,
        elevation: 3,
    },
});

export default ForcastWeather;
