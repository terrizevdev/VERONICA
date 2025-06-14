// commands/kick.js
export const name = 'kick';
export const description = 'Kick user from group';
export const ownerOnly = false;
export const groupOnly = true;
export const adminOnly = true;
export const botAdminOnly = true;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (!mentionedJid?.length) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Please mention the user to kick',
            quoted: message 
        });
    }

    try {
        await client.groupParticipantsUpdate(remoteJid, mentionedJid, 'remove');
        await client.sendMessage(remoteJid, { 
            text: `✅ Successfully kicked @${mentionedJid[0].split('@')[0]}`,
            mentions: mentionedJid
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to kick user. Make sure I am admin!',
            quoted: message 
        });
    }
}