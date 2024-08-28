// components/locationService.js

import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform, Alert } from 'react-native';

export const Location = async () => {
    const permission = await request(
        Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (permission !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to access your location.');
        return null;
    }

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                console.error(error);
                reject('Unable to fetch location');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
};
