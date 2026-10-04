@echo off
title Push Website Serviceku ke GitHub
echo =======================================================
echo          PUSH OTOMATIS SERVICEKU KE GITHUB
echo =======================================================
echo.
set /p REPO_URL="Masukkan Link Repository GitHub Anda (contoh: https://github.com/username/serviceku.git): "
if "%REPO_URL%"=="" (
    echo [ERROR] Link repository tidak boleh kosong.
    pause
    exit /b
)

echo.
echo [1/4] Menginisialisasi Git...
git init

echo [2/4] Menambahkan semua file proyek...
git add .

echo [3/4] Membuat Commit...
git commit -m "Website Promosi Jasa Serviceku Elektronik"

echo [4/4] Mengirim (Push) ke GitHub...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo =======================================================
echo   SUKSES! Website Serviceku sudah terunggah di GitHub.
echo =======================================================
pause
