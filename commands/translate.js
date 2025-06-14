// commands/translate.js
import axios from 'axios';

export const name = 'translate';
export const description = 'Translate text to another language';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    
    if (args.length < 3) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Usage: !translate <source_lang> <target_lang> <text>\nExample: !translate en es Hello',
            quoted: message 
        });
    }

    const [sourceLang, targetLang, ...textParts] = args;
    const text = textParts.join(' ');

    try {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
                q: text,
                langpair: `${sourceLang}|${targetLang}`
            }
        });

        const translatedText = response.data.responseData.translatedText;
        await client.sendMessage(remoteJid, { 
            text: `🌍 Translation:\n\n` +
                  `📌 Original (${sourceLang}): ${text}\n` +
                  `🔁 Translated (${targetLang}): ${translatedText}`,
            quoted: message 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to translate text',
            quoted: message 
        });
    }
}