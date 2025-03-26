import { app, BrowserWindow, ipcMain } from "electron";
import { execFileSync, execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SVV = path.join(__dirname, "bin", "SoundVolumeView.exe");
const CSV = path.join(__dirname, "bin", "devices.csv");

ipcMain.handle("soundboard:activate", () => {
  execFileSync(SVV, ["/scomma", CSV, "/NoWindow"]);
  const rows = parse(fs.readFileSync(CSV, "utf8"), {
    columns: true,
    skip_empty_lines: true,
  });

  const defaultRow = rows.find((r) => r.Default === "Capture");
  const vbRow = rows.find(
    (r) =>
      r["Device Name"].includes("VB-Audio Virtual Cable") &&
      r.Direction === "Capture"
  );

  if (!defaultRow || !vbRow) {
    console.error("Cannot find default or VB‑Cable mic");
    return null;
  }

  const defaultMic = defaultRow["Device Name"];
  const vbCableMic = vbRow["Device Name"];

  execFileSync(SVV, [
    "/SwitchDefault",
    "VB-Audio Virtual Cable",
    vbCableMic,
    "",
    "/NoWindow",
  ]);
  
  // Find default output & VB‑Cable output
  const defaultOutputRow = rows.find((r) => r.Default === "Render");
  const vbOutputRow = rows.find(
    (r) =>
      r["Device Name"].includes("VB-Audio Virtual Cable") &&
      r.Direction === "Render"
  );
  
  const defaultOutput = defaultOutputRow["Device Name"];
  const vbCableOutput = vbOutputRow["Device Name"];
  
  // Swap default output → VB‑Cable output (Console)
  execFileSync(SVV, [
    "/SwitchDefault",
    defaultOutput,
    "CABLE Output",
    "0",
    "/NoWindow",
  ]);
  return { previous: defaultMic, current: vbCableMic };
});

ipcMain.handle("soundboard:restore", (_event, previous) => {
  if (!previous) return null;

  execFileSync(SVV, [
    "/SwitchDefault",
    previous,
    previous,
    "2",
    "/NoWindow",
  ]);
  console.log(`Restored Communications default mic → ${previous}`);
  return previous;
});

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
