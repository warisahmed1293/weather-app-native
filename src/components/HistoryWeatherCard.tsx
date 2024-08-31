import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import CardBGimage from '../assets/CardBGimage.png';

const HistoryWeatherCard = ({ name, country, temperature, condition, conditionImage }) => {
    return (
        <TouchableOpacity className='self-center mb-10 mt-10'>
            <ImageBackground
                source={CardBGimage}
                style={styles.cardBackground}
                resizeMode='stretch'
                imageStyle={styles.cardImage}
            >
                <View style={styles.cardContent}>
                    <View>
                        <Text style={styles.tempText}>{temperature}°C</Text>
                        <Text style={styles.conditionText}>{condition}</Text>
                        <Text style={styles.locationText}>{name}</Text>
                    </View>
                    <View style={styles.animationContainer}>
                        <LottieView
                            source={conditionImage}
                            autoPlay
                            loop
                            style={styles.lottieAnimation}
                        />
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardBackground: {
        width: 320,
        height: 200,
    },
    cardContent: {
        flexDirection: 'row',
        top: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
    },
    lottieAnimation: {
        width: 80,
        height: 80,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        marginTop: 5,
    },
    tempText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    conditionText: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
});

export default HistoryWeatherCard;
