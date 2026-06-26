const puppeteer = require('puppeteer');

async function testVercelComplete() {
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
  await page.type('input[name="email"]', 'test3@kreo-tech.com');
  await page.type('input[name="password"]', 'Password123!');
  
  console.log("Clicking login...");
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);
  
  console.log("Checking result URL:", page.url());
  
  if (page.url().includes('setup')) {
    console.log("On setup page, filling form...");
    await page.type('input[id="full_name"]', 'Test User');
    await page.type('input[id="college"]', 'IIT Test');
    
    console.log("Submitting setup...");
    await page.click('button:has-text("Complete Setup")');
    await page.waitForTimeout(2000);
    console.log("Result URL after setup:", page.url());
    const body = await page.evaluate(() => document.body.innerText);
    console.log("Body excerpt:", body.substring(0, 500));
    
    const html = await page.content();
    if (html.includes('This page couldn\'t load') || html.includes('A server error occurred')) {
      console.log("FOUND ERROR OVERLAY!");
      const matches = html.match(/\[\d+,"[^"]*Error: [^"]*"/g);
      if (matches) {
        console.log("Error details from chunks:", matches);
      }
    }
  }

  await browser.close();
}

testVercelComplete();