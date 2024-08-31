
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

const HalfScreenModal = ({ data }) => {

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short' };
        return date.toLocaleDateString('en-US', options);
    };
    return (

        <View style={styles.forecastContainer}>
            {data.forecast.forecastday.map((day, index) => (
                <TouchableOpacity key={index} style={styles.forecastItem}>
                    <Text style={styles.date}>{getDayOfWeek(day.date)}</Text>
                    <Image
                        className="w-[45px] h-[45px] mt-[6px]"
                        source={{ uri: `https:${day.day.condition.icon}` }}
                    />
                    <Text style={styles.temp}>{day.day.avgtemp_c}°C</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
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

export default HalfScreenModal;
