// soundboard.js
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SVV = path.join(__dirname, "bin", "SoundVolumeView.exe");
const CSV = path.join(__dirname, "bin", "devices.csv");

let previousState = null;

export function activateSoundboard() {
  execFileSync(SVV, ["/scomma", CSV]);
  const rows = parse(fs.readFileSync(CSV, "utf8"), { columns: true, skip_empty_lines: true });

  const defaultMic = rows.find(r => r.Default === "Capture")["﻿Name"];
  const vbMic      = rows.find(r => r["Device Name"].includes("VB-Audio Virtual Cable") && r.Direction === "Capture")["﻿Name"];

  execFileSync(SVV, ["/SetListenToThisDevice", defaultMic, "1"]);

  execFileSync(SVV, ["/SetDefault", vbMic, "all"]);

  previousState = { previousMic: defaultMic };
  return previousState;
}

export function restoreSoundboard(prev) {
  const mic = prev?.previousMic;
  if (mic) {
    execFileSync(SVV, ["/SetListenToThisDevice", mic, "0"]);
    execFileSync(SVV, ["/SetDefault", mic, "all"]);
  }
  return prev;
}
