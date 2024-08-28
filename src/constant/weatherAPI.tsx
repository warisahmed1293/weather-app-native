export const fetchCurrentWeather = async (city) => {
    const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2012511afemsh6fa70ebe74304ebp1e9cf6jsne8ccdffbd331',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
};

export const fetchForecastWeather = async (city) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2012511afemsh6fa70ebe74304ebp1e9cf6jsne8ccdffbd331',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast weather:', error);
    }
};


export const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2012511afemsh6fa70ebe74304ebp1e9cf6jsne8ccdffbd331',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};


export const fetchSearchWeather = async (city) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2012511afemsh6fa70ebe74304ebp1e9cf6jsne8ccdffbd331',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
};