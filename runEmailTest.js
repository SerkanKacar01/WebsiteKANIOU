/**
 * Test script to verify all email notifications work properly
 */

import { testAllEmailNotifications } from './server/testEmailSystem.js';

async function runTest() {
  console.log('🚀 Running comprehensive email system test for KANIOU...');
  await testAllEmailNotifications();
}

runTest().catch(console.error);