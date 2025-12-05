# How to Get Your Firebase Web Config

You've provided the service account key, but for the web app, you need the **Web SDK configuration**.

## Steps to Get Web Config:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **rauanagym**
3. Click the gear icon ⚙️ next to "Project Overview"
4. Click "Project settings"
5. Scroll down to "Your apps" section
6. If you don't see a web app (</> icon), click "Add app" → Web
7. Register app with nickname: "FitCoach Web"
8. You'll see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "rauanagym.firebaseapp.com",
  projectId: "rauanagym",
  storageBucket: "rauanagym.appspot.com",
  messagingSenderId: "...",
  appId: "1:..."
};
```

9. Copy those values and paste them below

## Once You Have It:

I'll help you update the `.env.local` file with the correct values.

## Quick Access Link:

https://console.firebase.google.com/project/rauanagym/settings/general

Look for the "Web apps" section at the bottom of the page.
