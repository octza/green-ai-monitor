@echo off
title Green AI Monitor - Local Server
cd /d "%~dp0"
echo ====================================================
echo Starting Green AI Monitor...
echo ====================================================
start http://localhost:3000
npm run dev -- --host --port 3000
pause
