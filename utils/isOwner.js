// utils/isOwner.js
import config from '../config.js';

export function isOwner(remoteJid) {
    return config.owners.includes(remoteJid);
}