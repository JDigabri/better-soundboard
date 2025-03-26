import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { activateSoundboard, restoreSoundboard } from "./soundboard.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

ipcMain.handle("soundboard:activate", () => activateSoundboard());
ipcMain.handle("soundboard:restore", (_e, prev) => restoreSoundboard(prev));

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const url = !app.isPackaged
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  win.loadURL(url);
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
