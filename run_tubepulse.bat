@echo off
title TubePulse AI SaaS Launcher
cd /d "%~dp0"
echo ========================================================
echo        🚀 STARTING TUBEPULSE AI SAAS PLATFORM 🚀
echo ========================================================
echo.

if not exist node_modules (
    echo [1/2] Installing dependencies...
    call npm install
)

echo [2/2] Launching TubePulse Dev Server...
start "" "http://localhost:3000"
npm run dev
pause
