// handlers/messageHandler.js
import { isCommand, parseCommand, getCommand } from './commandHandler.js';
import { isOwner } from '../utils/isOwner.js';
import { isAdmins } from '../utils/isAdmins.js';
import { isBotAdmins } from '../utils/isBotAdmins.js';

export async function handleMessage(msg, client) {
    try {
        if (!msg.messages || !msg.messages[0]) return;
        
        const message = msg.messages[0];
        if (!message.message) return;
        
        const content = JSON.stringify(message.message);
        const text = message.message.conversation || 
                    message.message.extendedTextMessage?.text || '';
        
        const remoteJid = message.key.remoteJid;
        const isGroup = remoteJid.endsWith('@g.us');
        
        if (isCommand(text)) {
            const { commandName, args } = parseCommand(text);
            const command = getCommand(commandName);
            
            if (command) {
                // Check permissions
                if (command.ownerOnly && !isOwner(remoteJid)) {
                    return client.sendMessage(remoteJid, { text: 'This command is only for owners!' });
                }
                
                if (command.groupOnly && !isGroup) {
                    return client.sendMessage(remoteJid, { text: 'This command only works in groups!' });
                }
                
                if (command.adminOnly && isGroup) {
                    const admins = await isAdmins(client, remoteJid);
                    if (!admins.includes(message.participant || message.key.participant)) {
                        return client.sendMessage(remoteJid, { text: 'This command is only for admins!' });
                    }
                }
                
                if (command.botAdminOnly && isGroup) {
                    const isBotAdmin = await isBotAdmins(client, remoteJid);
                    if (!isBotAdmin) {
                        return client.sendMessage(remoteJid, { text: 'I need to be admin to execute this command!' });
                    }
                }
                
                await command.execute(message, client, args);
            }
        }
    } catch (error) {
        console.error('Error in messageHandler:', error);
    }
}