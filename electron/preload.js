const { contextBridge, ipcRenderer } = require('electron');

let previousState = null;

contextBridge.exposeInMainWorld('audioAPI', {
  activate: async () => {
    previousState = await ipcRenderer.invoke('soundboard:activate');
    return previousState;
  },
  restore: () => ipcRenderer.invoke('soundboard:restore', previousState),
  getSoundFiles: async () => {
    return await ipcRenderer.invoke('get-sound-files');
  },
  // New API for subscribing to file change events
  onSoundFilesChanged: (callback) => {
    ipcRenderer.on('sound-files-changed', (event, data) => {
      callback(data);
    });
  }
});

contextBridge.exposeInMainWorld('electronAPI', {
  close: () => ipcRenderer.invoke('close-app'),
  minimize: () => ipcRenderer.invoke('minimize-app'),
  maximize: () => ipcRenderer.invoke('maximize-app'),
  isMaximized: () => ipcRenderer.invoke('is-maximized-app'),
});
