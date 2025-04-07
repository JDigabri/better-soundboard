import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { activateSoundboard, restoreSoundboard } from './soundboard.js';
import { getSoundFiles } from './getSoundFiles.js'; // Your existing module
import { watchSoundFiles } from './watchFileChange.js'; // Import the new watcher

const __dirname = path.dirname(fileURLToPath(import.meta.url));

ipcMain.handle('soundboard:activate', () => activateSoundboard());
ipcMain.handle('soundboard:restore', (_e, prev) => restoreSoundboard(prev));
ipcMain.handle('get-sound-files', () => getSoundFiles());

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const url = !app.isPackaged
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '..', 'dist', 'index.html')}`;

  win.loadURL(url);
  
  // Start watching for sound file changes after window is created
  watchSoundFiles();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
