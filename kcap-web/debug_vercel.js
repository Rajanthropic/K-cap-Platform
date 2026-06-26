const puppeteer = require('puppeteer');

async function testVercel() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[Browser ${msg.type()}]`, msg.text());
  });
  
  page.on('pageerror', err => {
    console.log('[Browser Error]', err.message);
  });
  
  console.log("Navigating to login...");
  await page.goto('https://k-cap-platform.vercel.app/login', { waitUntil: 'networkidle2' });
  
  console.log("Typing credentials...");
  await page.type('input[name="email"]', 'raj@kreo-tech.com');
  await page.type('input[name="password"]', 'RajAdmin123!');
  
  console.log("Clicking login...");
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);
  
  console.log("Checking result URL:", page.url());
  const body = await page.evaluate(() => document.body.innerText);
  console.log("Body excerpt:", body.substring(0, 500));
  
  // Look for Next.js error
  const html = await page.content();
  if (html.includes('This page couldn\'t load') || html.includes('A server error occurred')) {
    console.log("FOUND ERROR OVERLAY!");
    // The exact error trace is usually in the __next_f script tags
    const matches = html.match(/\[\d+,"[^"]*Error: [^"]*"/g);
    if (matches) {
      console.log("Error details from chunks:", matches);
    }
  }

  await browser.close();
}

testVercel();