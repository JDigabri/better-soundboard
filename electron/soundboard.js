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

export async function activateSoundboard() {
  execFileSync(SVV, ["/scomma", CSV, "/NoWindow"]);

  await new Promise((resolve) => setTimeout(resolve, 200));

  const rows = parse(fs.readFileSync(CSV, "utf8"), {
    columns: true,
    skip_empty_lines: true,
  });
  console.log(
    "Loaded devices:",
    rows.map(
      (r) => `${r["Device Name"]} (${r.Direction}, Default=${r.Default})`
    )
  );

  const defaultMicRow = rows.find((r) => r.Default === "Capture");
  const vbMicRow = rows.find(
    (r) =>
      r["Device Name"].includes("VB-Audio Virtual Cable") &&
      r.Direction === "Capture"
  );

  if (!defaultMicRow || !vbMicRow)
    throw new Error("Cannot find default or VB‑Cable mic");

  var defaultMic = defaultMicRow["﻿Name"];
  var vbMic = vbMicRow["﻿Name"];
  console.log(`Switching mic: "${defaultMic}" → "${vbMic}"`);
  execFileSync(SVV, ["/SetDefault", vbMic, "all", "/NoWindow"]);

  const defaultOutRow = rows.find((r) => r.Default === "Render");
  const vbOutRow = rows.find(
    (r) =>
      r["Device Name"].includes("VB-Audio Virtual Cable") &&
      r.Direction === "Render"
  );

  if (!defaultOutRow || !vbOutRow)
    throw new Error("Cannot find default or VB‑Cable output");

  var defaultOut = defaultOutRow["﻿Name"];
  var vbOut = vbOutRow["﻿Name"];
  console.log(`Switching output: "${defaultOut}" → "${vbOut}"`);
  execFileSync(SVV, ["/SetDefault", vbOut, "all", "/NoWindow"]);

  previousState = { previousMic: defaultMic, previousOut: defaultOut };
  return previousState;
}

export function restoreSoundboard(prev) {
    console.log("restoreSoundboard called with:", prev);
    const { previousMic, previousOut } = prev || {};
  
    if (previousMic) {
      console.log(`Restoring mic default → "${previousMic}"`);
      execFileSync(SVV, ["/SetDefault", previousMic, "all", "/NoWindow"]); // 2 = Communications default
      console.log("Mic restored successfully");
    } else {
      console.log("No previousMic to restore");
    }
  
    if (previousOut) {
      console.log(`Restoring output default → "${previousOut}"`);
      execFileSync(SVV, ["/SetDefault", previousOut, "all", "/NoWindow"]); // all covers Console+Multimedia+Communications
      console.log("Output restored successfully");
    } else {
      console.log("No previousOut to restore");
    }
  
    return { previousMic, previousOut };
  }
  