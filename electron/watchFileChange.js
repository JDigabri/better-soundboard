// electron/watchFileChange.js
import fs from 'fs';
import path from 'path';
import { BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const soundsDir = path.join(__dirname, '..', 'public', 'sounds');

export function watchSoundFiles() {
  fs.watch(soundsDir, (eventType, filename) => {
    // Filter for .mp3 files (you can adjust this as needed)
    if (filename && filename.endsWith('.mp3')) {
      console.log(`Sound file changed: ${filename} (${eventType})`);
      // Notify the renderer process of the change
      const win = BrowserWindow.getAllWindows()[0];
      if (win) {
        win.webContents.send('sound-files-changed', { eventType, filename });
      }
    }
  });
}
