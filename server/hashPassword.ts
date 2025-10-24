/**
 * 🔐 PASSWORD HASHING UTILITY
 * 
 * This script helps you generate a bcrypt hash for the ADMIN_PASSWORD.
 * 
 * USAGE:
 * 1. Run: node --loader tsx server/hashPassword.ts "YourStrongPassword123!"
 * 2. Copy the generated hash
 * 3. Set it as ADMIN_PASSWORD in Replit Secrets
 * 
 * SECURITY NOTES:
 * - The hash uses bcrypt with 12 rounds (OWASP 2025 recommended)
 * - Never commit plaintext passwords to git
 * - Always use strong passwords with 12+ characters
 * - Include uppercase, lowercase, numbers, and special characters
 */

import { hashPassword } from './simpleAuth.js';

const password = process.argv[2];

if (!password) {
  console.error('❌ Error: Please provide a password to hash');
  console.log('\nUsage: node --loader tsx server/hashPassword.ts "YourPassword"');
  console.log('\nPassword requirements:');
  console.log('  - Minimum 12 characters');
  console.log('  - At least one uppercase letter');
  console.log('  - At least one lowercase letter');
  console.log('  - At least one number');
  console.log('  - At least one special character');
  process.exit(1);
}

console.log('🔐 Hashing password...\n');

hashPassword(password).then(hash => {
  console.log('✅ Password hashed successfully!\n');
  console.log('Copy this hash and set it as ADMIN_PASSWORD in Replit Secrets:');
  console.log('─'.repeat(80));
  console.log(hash);
  console.log('─'.repeat(80));
  console.log('\n⚠️  SECURITY WARNING: Delete this terminal output after copying the hash!');
}).catch(err => {
  console.error('❌ Error hashing password:', err);
  process.exit(1);
});
