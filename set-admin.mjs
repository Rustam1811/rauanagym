import admin from 'firebase-admin';
import { readFileSync } from 'fs';

/**
 * Script to set the first admin user in Firestore
 * Usage: node set-admin.mjs YOUR_USER_ID
 */

// Read service account
const serviceAccount = JSON.parse(
  readFileSync('./rauanagym-firebase-adminsdk-fbsvc-91ee72ab56.json', 'utf8')
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setAdmin(userId) {
  if (!userId) {
    console.error('❌ Error: Please provide a user ID');
    console.log('Usage: node set-admin.mjs YOUR_USER_ID');
    process.exit(1);
  }

  try {
    console.log(`🔍 Looking for user: ${userId}`);
    
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error(`❌ User with ID "${userId}" not found in Firestore`);
      console.log('\n💡 Tip: The user must log in at least once to create their profile');
      process.exit(1);
    }

    // Update user role to admin
    await userRef.update({
      role: 'admin',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const userData = userDoc.data();
    console.log('✅ Successfully set admin role!');
    console.log(`\nUser: ${userData.displayName || userId}`);
    console.log(`Email: ${userData.email || 'N/A'}`);
    console.log('Role: admin');
    
  } catch (error) {
    console.error('❌ Error setting admin role:', error.message);
    process.exit(1);
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];
setAdmin(userId).then(() => {
  console.log('\n🎉 Done!');
  process.exit(0);
});
