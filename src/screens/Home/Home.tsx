import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import ForcastWeather from '../../components/ForcastWeather';
import houseImage from '../../assets/houseImage.png';
import dayBG from '../../assets/dayBG.jpg';
import nightBG from '../../assets/nightBG.jpg';
import CurrentLocationWeather from '../../components/CurrentLocationWeather';
import ModalImage from '../../assets/mainBG.png';

const { height } = Dimensions.get('window');


const Home = () => {
    const [localTime, setLocalTime] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(dayBG);
    const [textColor, setTextColor] = useState('black');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            setLocalTime(formattedTime);
        };
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (localTime) {
            const [hours] = localTime.split(':').map(Number);

            if (hours >= 6 && hours < 18) {
                setBackgroundImage(dayBG);
                setTextColor('black');
            } else {
                setBackgroundImage(nightBG);
                setTextColor('white');
            }
        }
    }, [localTime]);

    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    blurRadius={50}
                    source={backgroundImage}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.CurrentTemprature}>
                        <CurrentLocationWeather onTimeUpdate={setLocalTime} textColor={textColor} />
                    </View>
                    <View style={styles.overlay}>
                        <Image
                            blurRadius={0}
                            source={houseImage}
                            style={styles.overlayImage}
                        />
                    </View>
                </ImageBackground>
            </View>
            <View>
                <View style={styles.bottomContainer}>
                    <ImageBackground
                        blurRadius={50}
                        source={ModalImage}
                        style={styles.backgroundImages}
                        resizeMode="cover"
                    >

                        <View style={styles.touchable}>
                            <Text style={styles.title}>3-Day Weather Forecast</Text>
                            <View className="h-[1px] bg-white w-[100%] my-[20px] shadow-black shadow-sm drop-shadow-md" />
                            <ForcastWeather />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 125,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayImage: {
        width: 350,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CurrentTemprature: {
        position: 'absolute',
        top: 0,
        bottom: 475,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
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
    backgroundImages: {
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
