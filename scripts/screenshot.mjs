import puppeteer from "../node_modules/.pnpm/puppeteer-core@24.40.0/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/placeholders");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const SITES = [
  // Landings
  { url: "https://buschfranco.github.io/Intelli.dev/", file: "landing-intelli.png" },
  { url: "https://portuauto.vercel.app", file: "landing-portuauto.png" },
  { url: "https://norton-help.xipio.online/", file: "landing-norton.png" },
  { url: "https://themagplus-at.com/", file: "landing-magplus-at.png" },
  { url: "https://epic-play.com/", file: "landing-epic-play.png" },
  // Apps
  { url: "https://www.recaap.ai/", file: "app-recaap.png" },
  { url: "https://magplus.club/", file: "app-magplus.png" },
  { url: "https://devrequest.vercel.app", file: "app-utilitiesmdg.png" },
  { url: "https://github.com/BuschFranco/DashboardMDG", file: "app-dashboard.png" },
  { url: "https://github.com/BuschFranco/ArcgameUnity", file: "app-arcgame.png" },
  // APIs
  { url: "https://github.com/BuschFranco/ServerNest", file: "api-servernest.png" },
  { url: "https://github.com/BuschFranco/NodeSQLRestAPI", file: "api-nodesql.png" },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

for (const { url, file } of SITES) {
  const outPath = path.join(OUT_DIR, file);
  console.log(`📸 ${file} ← ${url}`);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    // Wait a bit for animations/lazy images
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    await page.close();
    console.log(`   ✓ saved`);
  } catch (err) {
    console.error(`   ✗ ${err.message}`);
  }
}

await browser.close();
console.log("\nDone.");
