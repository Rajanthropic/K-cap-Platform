const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  console.log("Navigating to https://k-cap-platform.vercel.app/login");
  await page.goto('https://k-cap-platform.vercel.app/login', { waitUntil: 'networkidle2' });
  
  const title = await page.title();
  console.log("Page Title:", title);
  
  const html = await page.content();
  if (html.includes('Sign Up')) {
    console.log("Login page rendered successfully!");
  } else {
    console.log("Login page did not render the form. HTML:", html.substring(0, 500));
  }
  
  await browser.close();
}
run();