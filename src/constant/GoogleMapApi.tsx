const RAPID_API_KEY = '2012511afemsh6fa70ebe74304ebp1e9cf6jsne8ccdffbd331';
const RAPID_API_HOST = 'google-api31.p.rapidapi.com';
const BASE_URL = 'https://google-api31.p.rapidapi.com/map';

export const GoogleMapApi = async ({
    text,
    place,
    street = '',
    city = '',
    country = '',
    state = '',
    postalcode = '',
    latitude = '',
    longitude = '',
    radius = ''
}) => {
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAPID_API_HOST,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
            place,
            street,
            city,
            country,
            state,
            postalcode,
            latitude,
            longitude,
            radius,
        }),
    };

    try {
        const response = await fetch(BASE_URL, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
};
