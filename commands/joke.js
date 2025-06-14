// commands/joke.js
import axios from 'axios';

export const name = 'joke';
export const description = 'Get a random joke';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client) {
    const remoteJid = message.key.remoteJid;

    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist');
        const joke = response.data.type === 'single' 
            ? response.data.joke 
            : `${response.data.setup}\n\n${response.data.delivery}`;
        
        await client.sendMessage(remoteJid, { 
            text: `😂 Joke:\n\n${joke}`,
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to fetch joke',
            quoted: message 
        });
    }
}