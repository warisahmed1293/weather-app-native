// screens/CurrentLocationWeather.js

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Location } from '../constant/Location';
import { fetchWeatherByCoordinates } from '../constant/weatherAPI';

const CurrentLocationWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setError(err);
                setLoading(false);
            }
        };

        fetchLocationAndWeather();
    }, []);

    useEffect(() => {
        if (location) {
            const fetchWeather = async () => {
                try {
                    const data = await fetchWeatherByCoordinates(
                        location.coords.latitude,
                        location.coords.longitude
                    );
                    setWeatherData(data);
                } catch (err) {
                    setError('Failed to fetch weather data');
                } finally {
                    setLoading(false);
                }
            };

            fetchWeather();
        }
    }, [location]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {weatherData ? (
                <View style={styles.container}>
                    <Text style={styles.title}>{weatherData.location.name}</Text>
                    <Text style={{ fontSize: 70, color: 'white', fontFamily: 'Product Sans Infanity' }}>{weatherData.current.temp_c}°C</Text>
                    <Text style={{ fontSize: 15, color: 'lightgrey', fontWeight: '500', fontFamily: 'Product Sans Infanity' }}>{weatherData.current.condition.text}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100, fontFamily: 'Product Sans Infanity' }}>
                        <Text style={{ fontSize: 15, fontWeight: '800', color: 'white', fontFamily: 'Product Sans Infanity' }}>{weatherData.current.humidity}%</Text>
                        <Text style={{ fontSize: 15, fontWeight: '800', color: 'white', fontFamily: 'Product Sans Infanity' }}>{weatherData.current.wind_kph}kph</Text>
                    </View>
                </View>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        color: 'white',
    },
    errorText: {
        color: 'red',
    },
});

export default CurrentLocationWeather;
