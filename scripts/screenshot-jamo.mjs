import puppeteer from "../node_modules/.pnpm/puppeteer-core@24.40.0/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
await page.goto("https://justamarketingoffice.vercel.app/", { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: "public/placeholders/jamo.png", clip: { x: 0, y: 0, width: 1280, height: 800 } });
await browser.close();
console.log("done");
