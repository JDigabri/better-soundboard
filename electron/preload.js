const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('audioAPI', {
  activate: () => ipcRenderer.invoke('soundboard:activate'),
  restore: (previous) => ipcRenderer.invoke('soundboard:restore', previous)
})
