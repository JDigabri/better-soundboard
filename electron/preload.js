const { contextBridge, ipcRenderer } = require('electron')
let previousState = null

contextBridge.exposeInMainWorld('audioAPI', {
  activate: async () => {
    previousState = await ipcRenderer.invoke('soundboard:activate')
    return previousState
  },
  restore: () => ipcRenderer.invoke('soundboard:restore', previousState)
})
