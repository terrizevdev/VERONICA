// commands/add.js
export const name = 'add';
export const description = 'Add user to group';
export const ownerOnly = false;
export const groupOnly = true;
export const adminOnly = true;
export const botAdminOnly = true;

export async function execute(message, client, args) {
    const remoteJid = message.key.remoteJid;
    const number = args[0]?.replace(/[^0-9]/g, '');

    if (!number) {
        return client.sendMessage(remoteJid, { 
            text: '❌ Please provide a phone number with country code\nExample: !add 256784',
            quoted: message 
        });
    }

    try {
        const userJid = `${number}@s.whatsapp.net`;
        await client.groupParticipantsUpdate(remoteJid, [userJid], 'add');
        await client.sendMessage(remoteJid, { 
            text: `✅ Successfully added ${number} to the group`
        });
    } catch (error) {
        await client.sendMessage(remoteJid, { 
            text: `❌ Failed to add user: ${error.message}`,
            quoted: message 
        });
    }
}