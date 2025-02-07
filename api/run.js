const chromium = require("@sparticuz/chromium")
const puppeteer = require("puppeteer-core")

export default async function handler(request, response) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
    ],
    ignoreDefaultArgs: ["--disable-extensions"],
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()
  await page.goto("https://www.craiyon.com")
  await page.waitForTimeout(5000);
  const cookies = await page.cookies();
  
  const title = await page.title()

  await page.close()

  await browser.close()

  response.status(200).json({
    cookies
  })
}
