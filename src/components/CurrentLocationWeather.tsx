import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Location } from '../constant/Location';
import { fetchWeatherByCoordinates } from '../constant/weatherAPI';
import LottieView from 'lottie-react-native';

import cloudy_weather from '../assets/lottie/cloudy_weather.json'
import partialy_cloudy from '../assets/lottie/partialy_cloudy.json'
import rain from '../assets/lottie/rain.json'
import sunny_weather from '../assets/lottie/sunny weather.json'
import thunder_cloud from '../assets/lottie/thunder_cloud.json'


const CurrentLocationWeather = ({ onTimeUpdate, textColor }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null)

    const weatherAnimations = {
        "Moderate or heavy rain with thunder": thunder_cloud,
        "Partly cloudy": partialy_cloudy,
        "Moderate or heavy rain shower": rain,
        "Patchy light drizzle": rain,
        "Sunny": sunny_weather,
        "Patchy rain nearby": rain,
        "Thunderstorm": thunder_cloud,
        "Clear": sunny_weather,
        "Light rain": rain,
        "Cloudy": cloudy_weather,
        "Patchy light rain with thunder": rain,
        "Mist": cloudy_weather,



    };

    const getWeatherAnimation = () => {
        if (!weatherData) return null;

        const condition = weatherData.current.condition.text;
        return weatherAnimations[condition] || null;
    };
    const weatherAnimation = getWeatherAnimation();
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
                    if (onTimeUpdate) {
                        onTimeUpdate(data.location.localtime.split(' ')[1]);
                    }
                } catch (err) {
                    setError('Failed to fetch weather data');
                } finally {
                    setLoading(false);
                }
            };

            fetchWeather();
        }
    }, [location, onTimeUpdate]);

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

                    <Text style={[styles.title, { color: textColor }]}>{weatherData.location.name}</Text>
                    <Text style={{ fontSize: 70, color: textColor, fontFamily: 'Product Sans Infanity' }}>
                        {weatherData.current.temp_c}°C
                    </Text>
                    <Text style={{ fontSize: 15, color: textColor, fontWeight: '500', fontFamily: 'Product Sans Infanity' }}>
                        {weatherData.current.condition.text}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100, fontFamily: 'Product Sans Infanity' }}>
                        <Text style={{ fontSize: 15, fontWeight: '800', color: textColor, fontFamily: 'Product Sans Infanity' }}>
                            {weatherData.current.humidity}%
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: '800', color: textColor, fontFamily: 'Product Sans Infanity' }}>
                            {weatherData.current.wind_kph}kph
                        </Text>
                    </View>
                    {weatherAnimation && (
                        <LottieView
                            source={weatherAnimation}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    )}
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
    },
    errorText: {
        color: 'red',
    },
    lottie: {
        width: 100,
        height: 100,
    },
});

export default CurrentLocationWeather;
