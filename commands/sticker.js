// commands/sticker.js
import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { writeFile, unlink } from 'fs/promises';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

export const name = 'sticker';
export const description = 'Convert image to sticker';
export const ownerOnly = false;
export const groupOnly = false;
export const adminOnly = false;
export const botAdminOnly = false;

export async function execute(message, client) {
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const remoteJid = message.key.remoteJid;

    if (!quoted?.imageMessage) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Please reply to an image to convert to sticker',
            quoted: message 
        });
    }

    try {
        const buffer = await downloadMediaMessage(message, 'buffer', {});
        const sticker = new Sticker(buffer, {
            pack: config.name,
            author: 'Terrizev,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 70,
        });

        await client.sendMessage(remoteJid, await sticker.toMessage());
    } catch (error) {
        console.error(error);
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to create sticker',
            quoted: message 
        });
    }
}