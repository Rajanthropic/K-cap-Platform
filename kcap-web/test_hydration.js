const puppeteer = require('puppeteer');

async function checkHydration() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[Browser ${msg.type()}]`, msg.text());
  });
  
  page.on('pageerror', err => {
    console.log('[Browser Error]', err.message);
  });
  
  // Set auth cookies for iamraj718@gmail.com
  const sessionStr = '{"access_token":"dummy","token_type":"bearer","expires_in":3600,"refresh_token":"dummy","user":{"id":"f75a2183-3a1f-4691-8d59-344c036e911a","aud":"authenticated","role":"authenticated","email":"iamraj718@gmail.com","phone":"","app_metadata":{"provider":"email","providers":["email"]},"user_metadata":{"email":"iamraj718@gmail.com","email_verified":false,"full_name":"iamraj718","phone_verified":false,"sub":"f75a2183-3a1f-4691-8d59-344c036e911a"},"identities":[{"identity_id":"e3f89e24-4f46-444c-bcba-c5a5ccba3e06","id":"f75a2183-3a1f-4691-8d59-344c036e911a","user_id":"f75a2183-3a1f-4691-8d59-344c036e911a","identity_data":{"email":"iamraj718@gmail.com","email_verified":false,"phone_verified":false,"sub":"f75a2183-3a1f-4691-8d59-344c036e911a"},"provider":"email","last_sign_in_at":"2026-06-10T12:48:03.709322896Z","created_at":"2026-06-10T12:48:03.709384Z","updated_at":"2026-06-10T12:48:03.709384Z"}],"created_at":"2026-06-10T12:48:03.704252Z","updated_at":"2026-06-10T12:48:03.71424Z"}}';
  
  await page.setCookie({
    name: 'sb-ykvmubrvflqcmjavyxtl-auth-token.0',
    value: encodeURIComponent(sessionStr),
    domain: 'localhost',
    path: '/'
  });

  console.log("Navigating to dashboard...");
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2' });
  
  console.log("Done.");
  await browser.close();
}
checkHydration();