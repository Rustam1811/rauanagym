// Temporary script to get Firebase Web SDK config using service account
const https = require('https');

const serviceAccount = require('./rauanagym-firebase-adminsdk-fbsvc-91ee72ab56.json');

console.log('\n🔍 Detected project:', serviceAccount.project_id);
console.log('\n📋 For your web app, you need to:');
console.log('\n1. Go to: https://console.firebase.google.com/project/rauanagym/settings/general');
console.log('2. Scroll to "Your apps" section');
console.log('3. If no web app exists:');
console.log('   - Click "+ Add app"');
console.log('   - Select "Web" (</> icon)');
console.log('   - Register app with any nickname');
console.log('4. Copy the firebaseConfig values');
console.log('\n⚠️  The service account file you provided is for BACKEND/Admin SDK.');
console.log('    Web browsers need a different config (Web SDK).\n');
console.log('Your project ID:', serviceAccount.project_id);
console.log('Expected auth domain:', `${serviceAccount.project_id}.firebaseapp.com`);
console.log('Expected storage bucket:', `${serviceAccount.project_id}.appspot.com`);
console.log('\nYou need to get from Firebase Console:');
console.log('- apiKey (starts with AIzaSy...)');
console.log('- messagingSenderId (numbers)');
console.log('- appId (format: 1:NUMBER:web:HASH)');
