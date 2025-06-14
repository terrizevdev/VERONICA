// commands/weather.js
import axios from 'axios';

export const name = 'weather';
export const description = 'Get weather information';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    const location = args.join(' ');

    if (!location) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Please provide a location\nExample: !weather London',
            quoted: message 
        });
    }

    try {
        const apiKey = '4902c0f2550f58298ad4146a92b65e10';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        const weather = response.data;

        const weatherText = `🌦️ Weather for ${weather.name}, ${weather.sys.country}\n\n` +
                           `🌡️ Temperature: ${weather.main.temp}°C (Feels like ${weather.main.feels_like}°C)\n` +
                           `📊 Humidity: ${weather.main.humidity}%\n` +
                           `💨 Wind: ${weather.wind.speed} m/s\n` +
                           `☁️ Condition: ${weather.weather[0].description}\n` +
                           `🌄 Pressure: ${weather.main.pressure} hPa`;

        await client.sendMessage(remoteJid, { 
            text: weatherText,
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to fetch weather or location not found',
            quoted: message 
        });
    }
}