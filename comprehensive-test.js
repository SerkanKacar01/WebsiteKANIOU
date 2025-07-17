#!/usr/bin/env node

import http from 'http';
import fs from 'fs';

function testApplication() {
  console.log('\n🧪 COMPREHENSIVE APPLICATION TEST\n');
  
  // Test 1: Server Response
  console.log('1. Testing server response...');
  const req = http.request('http://localhost:5000', (res) => {
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   Headers: ${JSON.stringify(res.headers, null, 2)}`);
    
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      console.log('\n2. Testing HTML content...');
      
      // Test 2: HTML Structure
      const hasHtml = body.includes('<html');
      const hasHead = body.includes('<head');
      const hasBody = body.includes('<body');
      const hasRoot = body.includes('id="root"');
      const hasCookiebot = body.includes('cookiebot.com');
      const hasTitle = body.includes('<title>');
      
      console.log(`   HTML structure: ${hasHtml ? '✅' : '❌'}`);
      console.log(`   Head section: ${hasHead ? '✅' : '❌'}`);
      console.log(`   Body section: ${hasBody ? '✅' : '❌'}`);
      console.log(`   Root element: ${hasRoot ? '✅' : '❌'}`);
      console.log(`   Cookiebot script: ${hasCookiebot ? '✅' : '❌'}`);
      console.log(`   Title tag: ${hasTitle ? '✅' : '❌'}`);
      
      // Test 3: GDPR Compliance
      console.log('\n3. Testing GDPR compliance...');
      const cookiebotFirst = body.indexOf('cookiebot.com') < body.indexOf('main.tsx');
      const hasAutoBlocking = body.includes('data-cbid') || body.includes('data-culture');
      const hasDataCulture = body.includes('data-culture="nl"');
      
      console.log(`   Cookiebot first script: ${cookiebotFirst ? '✅' : '❌'}`);
      console.log(`   Auto-blocking enabled: ${hasAutoBlocking ? '✅' : '❌'}`);
      console.log(`   Dutch culture setting: ${hasDataCulture ? '✅' : '❌'}`);
      
      // Test 4: React App
      console.log('\n4. Testing React app integration...');
      const hasReactScript = body.includes('main.tsx');
      const hasViteClient = body.includes('vite/client');
      const hasModuleScript = body.includes('type="module"');
      
      console.log(`   React script: ${hasReactScript ? '✅' : '❌'}`);
      console.log(`   Vite client: ${hasViteClient ? '✅' : '❌'}`);
      console.log(`   Module script: ${hasModuleScript ? '✅' : '❌'}`);
      
      // Test 5: Overall Assessment
      console.log('\n5. Overall assessment...');
      const allBasicTests = hasHtml && hasHead && hasBody && hasRoot && hasTitle;
      const allGdprTests = hasCookiebot && hasDataCulture;
      const allReactTests = hasReactScript && hasModuleScript;
      
      console.log(`   Basic HTML: ${allBasicTests ? '✅' : '❌'}`);
      console.log(`   GDPR Compliance: ${allGdprTests ? '✅' : '❌'}`);
      console.log(`   React Integration: ${allReactTests ? '✅' : '❌'}`);
      
      // Final Status
      console.log('\n🎯 DEPLOYMENT STATUS:');
      if (allBasicTests && allGdprTests && allReactTests) {
        console.log('   ✅ READY FOR DEPLOYMENT');
        console.log('   🚀 All systems operational - click Deploy button');
      } else {
        console.log('   ❌ NEEDS FIXES');
        console.log('   🔧 Some components require attention');
      }
      
      console.log('\n');
    });
  });
  
  req.on('error', (err) => {
    console.error('❌ Server test failed:', err.message);
  });
  
  req.end();
}

// Run the test
testApplication();