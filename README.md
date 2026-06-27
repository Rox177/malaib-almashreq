# ملاعب المشرق | Malaib Al-Mashreq

Court booking web app for Al-Mashreq University sports facilities.

## Sports Courts

- Soccer (كرة القدم)
- Tennis (التنس)
- Basketball (كرة السلة)
- Volleyball (الطائرة)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- localStorage (mock data layer, ready for Firebase/Supabase)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, sports categories, Instagram |
| `/courts` | Browse all courts |
| `/courts/[id]` | Court details + booking form |
| `/admin` | Admin dashboard for managing bookings |

## Project Structure

```
app/           → Pages (Next.js App Router)
components/    → Reusable UI components
context/       → Language context (AR/EN)
data/          → Mock court data
types/         → TypeScript interfaces
utils/         → i18n, bookings, validation, time slots
```

## Features

- Arabic (RTL) and English (LTR) with language toggle
- Court browsing and detailed booking forms
- Time slot picker with conflict detection
- Booking storage in localStorage
- Admin dashboard with confirm/cancel/delete actions
- WhatsApp and Instagram contact links
- Mobile-first responsive design

## Future Backend Integration

Replace `localBookingRepository` in `utils/bookings.ts` with Firebase or Supabase implementation using the `BookingRepository` interface.
