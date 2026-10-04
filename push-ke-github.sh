#!/bin/bash
echo "======================================================="
echo "         PUSH OTOMATIS SERVICEKU KE GITHUB"
echo "======================================================="
echo ""
read -p "Masukkan Link Repository GitHub Anda: " REPO_URL
if [ -z "$REPO_URL" ]; then
    echo "[ERROR] Link repository tidak boleh kosong."
    exit 1
fi

echo ""
echo "[1/4] Menginisialisasi Git..."
git init

echo "[2/4] Menambahkan semua file proyek..."
git add .

echo "[3/4] Membuat Commit..."
git commit -m "Website Promosi Jasa Serviceku Elektronik"

echo "[4/4] Mengirim (Push) ke GitHub..."
git branch -M main
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"
git push -u origin main

echo ""
echo "======================================================="
echo "  SUKSES! Website Serviceku sudah terunggah di GitHub."
echo "======================================================="
