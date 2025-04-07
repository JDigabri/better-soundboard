// electron/getSoundFiles.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Adjust the path so it points to your public/sounds folder
const soundsDir = path.join(__dirname, '..', 'public', 'sounds');

export function getSoundFiles() {
  try {
    const files = fs.readdirSync(soundsDir);
    // Filter to only include .mp3 files (adjust if needed)
    return files.filter(file => file.endsWith('.mp3'));
  } catch (error) {
    console.error('Error reading sounds folder:', error);
    return [];
  }
}
