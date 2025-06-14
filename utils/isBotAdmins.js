// utils/isBotAdmins.js
export async function isBotAdmins(client, remoteJid) {
    try {
        const groupMetadata = await client.groupMetadata(remoteJid);
        const participants = groupMetadata.participants;
        const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net';
        const botParticipant = participants.find(p => p.id === botJid);
        return botParticipant?.admin !== null;
    } catch {
        return false;
    }
}