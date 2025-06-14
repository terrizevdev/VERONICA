// commands/quote.js
import axios from 'axios';

export const name = 'quote';
export const description = 'Create fancy text quote';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    const text = args.join(' ');

    if (!text) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Please provide text to quote\nExample: !quote Hello World',
            quoted: message 
        });
    }

    try {
        const apiUrl = `https://quote-api.bhadoo.pk/create?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        await client.sendMessage(remoteJid, {
            image: Buffer.from(response.data),
            caption: 'Here\'s your quote!',
            quoted: message
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to create quote',
            quoted: message 
        });
    }
}