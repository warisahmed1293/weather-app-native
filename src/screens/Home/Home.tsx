import { ImageBackground, StyleSheet, View, Dimensions, Image } from 'react-native';
import React from 'react';
import ForcastWeather from '../../components/ForcastWeather';
import houseImage from '../../assets/houseImage.png';
import CurrentLocationWeather from '../../components/CurrentLocationWeather';


const image = { uri: 'https://i.ibb.co/G7g9H17/Image-1.png' };
const Home = () => {
    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={image}
                    style={styles.backgroundImage}
                    resizeMode="cover"  // Ensure the image covers the entire container
                >
                    <View style={styles.CurrentTemprature} >
                        <CurrentLocationWeather />
                    </View>
                    <View style={styles.overlay}>
                        <Image
                            source={houseImage}
                            style={styles.overlayImage}
                        />
                    </View>
                </ImageBackground>
            </View>
            <View >
                <ForcastWeather />
            </View>
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Ensure the container takes up the full screen
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',  // Center content within ImageBackground
    },
    overlay: {
        position: 'absolute',  // Position overlay absolutely within ImageBackground
        top: 75,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayImage: {
        width: 350,  // Adjust the size as needed
        height: 350, // Adjust the size as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    CurrentTemprature: {
        position: 'absolute',  // Position overlay absolutely within ImageBackground
        top: 0,
        bottom: 525,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
