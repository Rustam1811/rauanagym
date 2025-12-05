# Copy .next and public folders to functions directory
Write-Host "Copying .next folder..."
Copy-Item -Recurse -Force .next functions/.next

Write-Host "Copying public folder..."
Copy-Item -Recurse -Force public functions/public

Write-Host "Build files copied successfully!"
