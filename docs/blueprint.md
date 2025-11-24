# **App Name**: CareerWaveApp

## 🔵 Frontend (React)

- React + Vite

- TailwindCSS version v4.1

- React Router

- Zustand oder Jotai für globales State-Management

- i18n (4 Sprachen): Englisch, Deutsch, Spanisch,   Französisch

- Light/Dark Mode mit Context + Tailwind

- Reusable UI Components (Buttons, Inputs, Layouts, Forms, Cards, etc.)

- API services klar getrennt in /services

- Hooks sauber gegliedert in /hooks

- Pages getrennt in /pages

- Komponenten in /components

- Absolute Imports

- Fehlerfreie, saubere, gut kommentierte Struktur

## 🔴 Backend (Bun + Elysia)

- Elysia Framework mit Bun

- Sauber getrennte Routen, Controller, Schemas

Zod für Validation

- JWT Authentication

- Rollen-System:

- Viewer (nicht eingeloggt)

- Candidate/User

- Employer

- Admin

- CRUD Endpoints:

- Job postings

- Bewerbungen

- Employer Profile

- User Profile

- Admin Management

- Saubere Ordnerstruktur:

src/
  routes/
  controllers/
  services/
  models/
  middleware/
  utils/


- Logging

- Error Handling

- Reusable Services

## 🟡 Database + Auth (Firebase – alles kostenlos)
# Verwende:

- Firebase Firestore

- Firebase Auth

- Firebase Storage (CV Upload)

- Firebase Security Rules

- Benötigte Collections:

- users

- employers

- jobs

- applications

- adminConfig

### Rollen-System in Firestore speichern
## 🌍 Features, die absolut notwendig sind:
# 🔹 Für Viewer (ohne Login)

- Jobs ansehen

- Filter / Suche (Titel, Ort, Kategorie, Vertrag, etc.)

- Sprache wechseln (EN/DE/ES/FR)

- Light/Dark Mode umschalten

# 🔹 Für Candidate / User

- Account erstellen

- Profil erstellen

- Profilbilder hochladen (cloudinary)

- Lebenslauf hochladen

- Sich auf Jobs bewerben

- Bewerbungsstatus sehen

- Bewerbungshistory ansehen

- Profil bearbeiten

# 🔹 Für Employer

- Employer Dashboard

- Jobs erstellen, bearbeiten, löschen

- Bewerbungen ansehen

- Kandidatenprofile ansehen

- Unternehmensprofil verwalten

# 🔹 Für Admin

- Nutzerverwaltung

- Arbeitgeber verifizieren

- Content Moderation

- Systemstatistiken

- Einstellungen

## 🟢 Mehrsprachigkeit

- Konfiguriere react-i18next

- 4 Sprachdateien: en, de, es, fr

- Alle UI-Strings in Übersetzungsdateien

## ⚫⚪ Light/Dark Mode

- Zustand speichern in LocalStorage

- Tailwind + class strategy (dark)

- ThemeContext erstellen

- UI anpassen

🚀 Deployment Setup

- Schritt für Schritt erklärung:

## 🔵 Frontend (React):

→ Deployment auf Vercel

- Build Script

- Environment Variables

- Domain Routing

- Preview Deployments

## 🔴 Backend (Bun/Elysia):

→ Deployment auf Fly.io

- fly.toml

- Dockerfile

- Start Script

- Env Handling

- Setup für Production

## 🟡 Firebase

- Security Rules

- Indexes

- Production Setup

📦 Liefere mir am Ende folgendes Ergebnis:
✔ 1) Vollständige Projektstruktur (Frontend + Backend)
✔ 2) Beispiel-Code für alle wichtigen Teile
✔ 3) Deployment-Files (Dockerfile, fly.toml, vercel.json)
✔ 4) Firebase Security Rules
✔ 5) Beispiel-Jobschema, Userschema, Employerschema
✔ 6) Beispiel-API-Endpunkte
✔ 7) Beispiel i18n-Dateien
✔ 8) Beispiel UI-Komponenten
✔ 9) Admin Dashboard Struktur
✔ 10) Kurze Setup-Anleitung für lokales Development

-  alles übersichtlich, klar getrennt, in perfekt lesbarer Struktur.