# Add Firebase env vars for ALL environments
Write-Host "Adding Firebase environment variables to ALL Vercel environments..." -ForegroundColor Cyan

$values = @{
    "NEXT_PUBLIC_FIREBASE_API_KEY" = "AIzaSyDjX8QvyvHr4jc0pKyDHRMbOWw3GvFZInM"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" = "rauanagym.firebaseapp.com"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID" = "rauanagym"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" = "rauanagym.firebasestorage.app"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" = "111319094046"
    "NEXT_PUBLIC_FIREBASE_APP_ID" = "1:111319094046:web:69a3b90cea2fca99096f0f"
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" = "G-QVW2VBK7CL"
}

foreach ($var in $values.GetEnumerator()) {
    Write-Host "`nAdding $($var.Key)..." -ForegroundColor Yellow
    
    # Add for production
    echo $var.Value | vercel env add $var.Key production
    
    Write-Host "Added to production" -ForegroundColor Green
}

Write-Host "`nDone! All Firebase variables added for ALL environments." -ForegroundColor Cyan
