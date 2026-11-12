/**
 * Genera el PDF del CV a partir de su fuente HTML.
 *
 *   pnpm cv                      → cv/fullstack.html → public/CV-FullStack.pdf
 *   pnpm cv cv/growth.html public/CV-Growth.pdf
 *
 * Requiere Chrome de Puppeteer (ya instalado como devDependency).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcArg = process.argv[2];
const outArg = process.argv[3];

const src = path.resolve(root, srcArg ?? "cv/fullstack.html");
const out = path.resolve(root, outArg ?? "public/CV-FullStack.pdf");

if (!fs.existsSync(src)) {
  console.error(`No existe la fuente: ${src}`);
  process.exit(1);
}

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(`file:///${src.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length || 1;
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`✔ ${path.relative(root, out)} — ${pages} página(s), ${kb} KB`);
  if (pages !== 1) {
    console.warn("⚠ El CV debería tener exactamente 1 página. Revisá que el contenido no desborde.");
  }
} finally {
  await browser.close();
}
