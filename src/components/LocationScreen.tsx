import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { GoogleMapApi } from '../constant/GoogleMapApi';


const LocationScreen = () => {
    const [city, setCity] = useState(''); // State for city input
    const [locationData, setLocationData] = useState(null); // State for fetched data
    const [loading, setLoading] = useState(false); // State to handle loading

    const searchLocation = async () => {
        if (!city) return; // If no city is entered, do nothing

        setLoading(true); // Start loading when the request is initiated
        try {
            const data = await GoogleMapApi({ text: city, place: city, city: city });
            setLocationData(data); // Set the fetched location data
        } catch (error) {
            console.error('Error fetching location data:', error);
        } finally {
            setLoading(false); // Stop loading after the request completes
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={city}
                onChangeText={setCity}
            />
            <Button title="Search Location" onPress={searchLocation} />

            {loading && <Text style={styles.loadingText}>Loading...</Text>}

            {/* Display the location data */}
            {locationData && !loading && (
                <ScrollView style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        {JSON.stringify(locationData, null, 2)} {/* Display data as JSON */}
                    </Text>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    loadingText: {
        marginVertical: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    resultContainer: {
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 5,
    },
    resultText: {
        fontSize: 14,
    },
});

export default LocationScreen;
