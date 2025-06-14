// commands/delete.js
export const name = 'delete';
export const description = 'Delete bot\'s messages';
export const ownerOnly = false;
export const groupOnly = true;
export const adminOnly = true; // Only admins can use
export const botAdminOnly = true; // Bot needs to be admin

export async function execute(message, client) {
    const remoteJid = message.key.remoteJid;
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quoted) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Please reply to the message you want to delete',
            quoted: message 
        });
        return;
    }
    
    try {
        const key = {
            remoteJid: remoteJid,
            id: message.message.extendedTextMessage.contextInfo.stanzaId,
            participant: message.message.extendedTextMessage.contextInfo.participant
        };
        
        await client.sendMessage(remoteJid, { 
            delete: key 
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: '❌ Failed to delete message. Make sure I sent that message and I am admin!',
            quoted: message 
        });
    }
}