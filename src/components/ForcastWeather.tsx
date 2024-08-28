// components/ForcastWeather.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import HalfScreenModal from './HalfScreenModal';
import { Location } from '../constant/Location';

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

    if (!forecast) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No forecast data available</Text>
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
});

export default ForcastWeather;
