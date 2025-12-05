# PowerShell script to add Firebase environment variables to Vercel
# Run this with: .\add-vercel-env.ps1

Write-Host "Adding Firebase environment variables to Vercel..." -ForegroundColor Cyan

# Define variables
$envVars = @{
    "NEXT_PUBLIC_FIREBASE_API_KEY" = "AIzaSyDjX8QvyvHr4jc0pKyDHRMbOWw3GvFZInM"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" = "rauanagym.firebaseapp.com"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID" = "rauanagym"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" = "rauanagym.firebasestorage.app"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" = "111319094046"
    "NEXT_PUBLIC_FIREBASE_APP_ID" = "1:111319094046:web:69a3b90cea2fca99096f0f"
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" = "G-QVW2VBK7CL"
}

foreach ($var in $envVars.GetEnumerator()) {
    Write-Host "Adding $($var.Key)..." -ForegroundColor Yellow
    
    # Use echo to pipe the value to vercel env add
    $value = $var.Value
    echo $value | vercel env add $var.Key production preview development
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully added $($var.Key)" -ForegroundColor Green
    } else {
        Write-Host "Failed to add $($var.Key)" -ForegroundColor Red
    }
}

Write-Host "Done! All environment variables have been added to Vercel." -ForegroundColor Cyan
Write-Host "You can now deploy with vercel --prod" -ForegroundColor Green
