<div align="center">

# Product Requirements Document

**Official Website — Balai Besar KSDA Papua Barat Daya**

**Document Version:** `1.0` · **Date:** 17 April 2026

---

_E-Government Portal for Conservation Area Management & Public Services_

</div>

---

## Table of Contents

| # | Section | Description |
|:-:|---|---|
| 1 | [Executive Summary](#1-executive-summary) | Product vision and objectives |
| 2 | [Stakeholders & User Personas](#2-stakeholders--user-personas) | Target audience and roles |
| 3 | [Information Architecture](#3-information-architecture--sitemap) | Sitemap and navigation structure |
| 4 | [Design System](#4-design-system) | Visual language, typography, components |
| 5 | [Core Public Service Modules](#5-core-public-service-modules) | Permit systems and service workflows |
| 6 | [Engagement & Supporting Features](#6-engagement--supporting-features) | Educational content and public tools |
| 7 | [News & Press Release Module](#7-news--press-release-module) | CMS, SEO, and media handling |
| 8 | [Technical Architecture](#8-technical-architecture) | Stack, rendering, and infrastructure |
| 9 | [Accessibility & Compliance](#9-accessibility--compliance) | WCAG, SPBE, regulatory alignment |
| 10 | [Performance Requirements](#10-performance-requirements) | Core Web Vitals and targets |
| 11 | [Phased Delivery Roadmap](#11-phased-delivery-roadmap) | Implementation timeline |

---

## 1. Executive Summary

### 1.1 Product Vision

Build the official digital portal for **Balai Besar Konservasi Sumber Daya Alam (BBKSDA) Papua Barat Daya** — the regional conservation authority under the Ministry of Environment and Forestry (KLHK) responsible for managing **27+ conservation units** across the Bird's Head Peninsula (Vogelkop), West Papua.

The website serves as the **primary digital bridge** between the government authority, researchers, businesses, and the general public. Its centerpiece is the **Public Services** section: a frictionless, transparent, and fully digital interface for permit applications, incident reporting, eco-tourism booking, and conservation information.

### 1.2 Core Objectives

| Objective | Success Metric |
|---|---|
| **Digitalize public services** | 80% of permit applications submitted online within 12 months of launch |
| **Reduce processing time** | Average permit processing time reduced by 40% |
| **Increase transparency** | 100% of service requests trackable via public ticket system |
| **Expand public engagement** | 50% increase in conservation area visitor registrations |
| **Improve discoverability** | Top 3 search ranking for "BBKSDA Papua Barat Daya" within 6 months |

### 1.3 Scope Boundaries

| In Scope | Out of Scope |
|---|---|
| Public-facing website and services portal | Internal staff management tools (SIMPEG, etc.) |
| CMS for news, press releases, and media | Mobile native applications (future phase) |
| Online permit application and tracking | Financial accounting systems |
| E-ticketing and booking for eco-tourism | GIS data editing tools (admin-side) |
| Incident reporting with geolocation | Real-time wildlife tracking dashboards |
| Biodiversity gallery and educational content | Third-party NGO collaboration portals |

### 1.4 Regulatory Framework

This portal must comply with the following regulatory instruments:

| Regulation | Relevance |
|---|---|
| **Perpres 95/2018 (SPBE)** | National e-government standards — interoperability, security, one-stop services |
| **UU 5/1990** (updated by **UU 32/2024**) | Conservation of Biological Resources and Ecosystems |
| **PP 7/1999** | Preservation of plant and animal species — permit terminology and classifications |
| **PP 28/2011** | Management of protected and conservation areas — access and zoning rules |
| **UU 41/1999** | Forestry law — foundational governance framework |
| **UU 29/2022** | Establishment of Papua Barat Daya Province |

---

## 2. Stakeholders & User Personas

### 2.1 Primary Personas

#### Persona 1: Researcher / Academic

| Attribute | Detail |
|---|---|
| **Name** | Dr. Maya — Marine Biologist, UNIPA |
| **Goal** | Obtain SIMAKSI (conservation area entry permit) for field research in Raja Ampat |
| **Pain Points** | Currently must visit the office in person; unclear document requirements; no tracking |
| **Needs** | Online application, clear checklist, upload capability, real-time status tracking |
| **Device** | Laptop (primary), mobile (secondary) |

#### Persona 2: Business Operator / Tour Operator

| Attribute | Detail |
|---|---|
| **Name** | Pak Yusuf — Eco-tourism operator, Sorong |
| **Goal** | Apply for IPPA (nature tourism business permit) and book group visits to TWA |
| **Pain Points** | Complex multi-document requirements; no digital submission; slow approval cycles |
| **Needs** | Multi-step guided form, document upload, payment integration, SLA visibility |
| **Device** | Mobile (primary), laptop (secondary) |

#### Persona 3: General Public / Concerned Citizen

| Attribute | Detail |
|---|---|
| **Name** | Mama Yohana — Community leader, Tambrauw |
| **Goal** | Report human-wildlife conflict (crocodile sighting near village) |
| **Pain Points** | No formal reporting channel; doesn't know who to contact; limited internet |
| **Needs** | Simple geotagged form, offline-capable, photo upload, follow-up tracking |
| **Device** | Mobile only (low-end Android) |

#### Persona 4: Journalist / Media

| Attribute | Detail |
|---|---|
| **Name** | Riska — Environmental journalist, Jakarta |
| **Goal** | Access press releases, download high-res wildlife photos for articles |
| **Pain Points** | No centralized media hub; images are low quality; no RSS feed |
| **Needs** | Press room with downloadable assets, RSS subscription, media contact info |
| **Device** | Laptop |

### 2.2 Secondary Personas

| Persona | Role | Primary Goal |
|---|---|---|
| **BBKSDA PR Staff** | Content author | Publish news, upload photos, manage press releases via CMS |
| **BBKSDA Service Officer** | Permit processor | Review applications, update ticket statuses (admin panel — future) |
| **Student / Educator** | Learning visitor | Access educational content about endemic species and conservation programs |

---

## 3. Information Architecture & Sitemap

### 3.1 Navigation Principles

1. **Public Services as Centerpiece** — The homepage hero and primary navigation prioritize service access above all else
2. **3-Click Rule** — Any public service should be reachable within 3 clicks from the homepage
3. **Progressive Disclosure** — Show high-level categories first, reveal detail on interaction
4. **Bilingual Ready** — Structure supports future Bahasa Indonesia / English toggle

### 3.2 Sitemap

```
/                                    # Homepage
├── /layanan                         # Public Services Hub (CENTERPIECE)
│   ├── /layanan/simaksi             # Access & Research Permits (SIMAKSI)
│   │   ├── /layanan/simaksi/ajukan  # Application Form
│   │   └── /layanan/simaksi/lacak   # Track Application Status
│   ├── /layanan/perizinan-flora-fauna  # Flora & Fauna Permitting
│   │   ├── /layanan/perizinan-flora-fauna/penangkaran    # Breeding Permits
│   │   ├── /layanan/perizinan-flora-fauna/peredaran      # Trade & Distribution
│   │   └── /layanan/perizinan-flora-fauna/pengangkutan   # Transportation Permits
│   ├── /layanan/laporan-insiden     # Incident Reporting
│   │   ├── /layanan/laporan-insiden/buat    # Submit Report Form
│   │   └── /layanan/laporan-insiden/lacak   # Track Report Status
│   ├── /layanan/tiket-wisata        # E-Ticketing / Eco-Tourism Booking
│   │   ├── /layanan/tiket-wisata/[area-slug]   # Area Detail & Booking
│   │   └── /layanan/tiket-wisata/pesanan       # My Bookings
│   └── /layanan/lacak               # Universal Ticket Tracker
│
├── /profil                          # Agency Profile
│   ├── /profil/tentang-kami         # About BBKSDA PBD
│   ├── /profil/visi-misi            # Vision & Mission
│   ├── /profil/struktur-organisasi  # Organizational Structure
│   ├── /profil/wilayah-kerja        # Working Territory & Map
│   └── /profil/kontak               # Contact Information
│
├── /kawasan                         # Conservation Areas
│   ├── /kawasan/[area-slug]         # Individual Area Detail Page
│   └── /kawasan/peta                # Interactive Map of All Areas
│
├── /berita                          # News & Press Releases
│   ├── /berita/[slug]               # Individual Article
│   ├── /berita/kategori/[category]  # Category Filter
│   └── /berita/rss.xml              # RSS Feed
│
├── /galeri                          # Biodiversity Gallery
│   ├── /galeri/flora                # Flora Database
│   ├── /galeri/fauna                # Fauna Database
│   └── /galeri/[species-slug]       # Species Detail Page
│
├── /edukasi                         # Education & Resources
│   ├── /edukasi/program-konservasi  # Conservation Programs
│   ├── /edukasi/unduh               # Downloads (Forms, Regulations, Reports)
│   └── /edukasi/faq                 # FAQ / Help Center
│
├── /regulasi                        # Regulations & Legal Framework
│   ├── /regulasi/[slug]             # Individual Regulation Detail
│   └── /regulasi/unduh              # Downloadable Documents
│
└── /sitemap.xml                     # XML Sitemap for SEO
```

### 3.3 Homepage Layout Blueprint

The homepage is designed as a **single-page scroll** with distinct sections, anchoring public services as the dominant first impression after the hero.

```
┌─────────────────────────────────────────────┐
│  NAVBAR (sticky, dark → light on scroll)    │
│  Logo | Layanan ▾ | Profil ▾ | Kawasan |    │
│  Berita | Galeri | ID/EN | [Layanan Online] │
├─────────────────────────────────────────────┤
│                                             │
│  HERO SECTION                               │
│  Full-bleed conservation area photograph    │
│  "Melindungi Keanekaragaman Hayati          │
│   Papua Barat Daya"                         │
│  [Akses Layanan Online →]  [Lapor Insiden]  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  PUBLIC SERVICES GRID (4 cards)             │
│  ┌──────────┐ ┌──────────┐                  │
│  │ SIMAKSI  │ │ Perizinan│                  │
│  │ Izin     │ │ Flora &  │                  │
│  │ Masuk    │ │ Fauna    │                  │
│  └──────────┘ └──────────┘                  │
│  ┌──────────┐ ┌──────────┐                  │
│  │ Lapor    │ │ Tiket    │                  │
│  │ Insiden  │ │ Wisata   │                  │
│  └──────────┘ └──────────┘                  │
│  → Track existing application [input field] │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  CONSERVATION AREAS SHOWCASE                │
│  Interactive map + scrollable cards of      │
│  featured areas (CA, SM, TWA, TB)           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  LATEST NEWS (3-card carousel)              │
│  Featured articles with hero images         │
│  [Lihat Semua Berita →]                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  BIODIVERSITY SPOTLIGHT                     │
│  Endemic species gallery carousel           │
│  (Cenderawasih, Kura-kura Reimann, etc.)   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  STATISTICS COUNTER (animated on scroll)    │
│  27+ Kawasan | 50+ Species | etc.           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  CTA BANNER                                 │
│  "Laporkan Gangguan Satwa Liar"             │
│  [Buat Laporan →]                           │
│                                             │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  Logo | Contact | Quick Links | Social      │
│  Regulatory badges | Copyright              │
└─────────────────────────────────────────────┘
```

---

## 4. Design System

### 4.1 Style Reference

Adapted from the **Waveyu** design system with a conservation-oriented color palette.

### 4.2 Typography

| Element | Font | Weight | Size (Desktop) | Size (Mobile) |
|---|---|---|---|---|
| **H1** | Bricolage Grotesque | 700 (Bold) | 4rem / 64px | 2.5rem / 40px |
| **H2** | Bricolage Grotesque | 600 (SemiBold) | 3rem / 48px | 2rem / 32px |
| **H3** | Bricolage Grotesque | 600 (SemiBold) | 2rem / 32px | 1.5rem / 24px |
| **H4** | Bricolage Grotesque | 500 (Medium) | 1.5rem / 24px | 1.25rem / 20px |
| **H5** | Bricolage Grotesque | 500 (Medium) | 1.25rem / 20px | 1.125rem / 18px |
| **Body** | Bricolage Grotesque | 400 (Regular) | 1rem / 16px | 1rem / 16px |
| **Small** | Bricolage Grotesque | 400 (Regular) | 0.875rem / 14px | 0.875rem / 14px |
| **Caption** | Bricolage Grotesque | 400 (Regular) | 0.75rem / 12px | 0.75rem / 12px |

### 4.3 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-black` | `rgb(33, 33, 33)` | Primary text, high-emphasis actions |
| `--color-white` | `rgb(255, 255, 255)` | Card surfaces, light text on dark backgrounds |
| `--color-accent` | `rgb(46, 125, 50)` | Primary brand color — forest green. Buttons, active states, links |
| `--color-accent-dark` | `rgb(27, 94, 32)` | Hover state for accent elements |
| `--color-accent-light` | `rgb(200, 230, 201)` | Light accent for badges, tags, subtle highlights |
| `--color-bg-page` | `rgb(247, 247, 247)` | Page background, section backgrounds |
| `--color-bg-subtle` | `rgb(234, 234, 234)` | Secondary containers, icon wrappers |
| `--color-bg-forest` | `rgb(15, 41, 22)` | Dark green surface for hero sections, footer, dark sections |
| `--color-bg-frost` | `rgba(255, 255, 255, 0.3)` | Frosted glass badges and buttons on images (with `backdrop-blur`) |
| `--color-text-muted` | `rgb(112, 112, 112)` | Body text, secondary text on light backgrounds |
| `--color-heading-accent` | `rgb(141, 141, 141)` | De-emphasized words within headings |
| `--color-text-frost` | `rgba(255, 255, 255, 0.3)` | Secondary text on dark backgrounds |
| `--color-border-subtle` | `rgba(33, 33, 33, 0.2)` | Dividers and structural borders |
| `--color-warning` | `rgb(245, 124, 0)` | Warning badges, fire incident indicators |
| `--color-danger` | `rgb(211, 47, 47)` | Error states, critical alerts |
| `--color-info` | `rgb(2, 136, 209)` | Informational badges, water/marine indicators |

### 4.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-outer` | `1.875rem` (30px) | Cards, sections, large containers |
| `--radius-inner` | `1.375rem` (22px) | Buttons, input fields, inner elements |
| `--radius-sm` | `0.75rem` (12px) | Tags, badges, small chips |

### 4.5 Spacing System

| Token | Value | Usage |
|---|---|---|
| `--gap-xs` | `0.5rem` | Tight spacing — badge groups, icon labels |
| `--gap-s` | `1rem` | Standard element spacing |
| `--gap-m` | `1.5rem` | Section inner padding, card content |
| `--gap-l` | `2rem` | Row gaps in layouts |
| `--gap-xl` | `4rem` | Column gaps, section vertical spacing |

**Section Padding (Responsive):**

| Breakpoint | Horizontal | Vertical |
|---|---|---|
| 1440px+ | `4rem` | `3rem` |
| Base (1024px) | `2rem` | `3rem` |
| Tablet (768px) | `2rem` | `3rem` |
| Landscape (620px) | `1.5rem` | `3rem` |
| Mobile (480px) | `1.5rem` | `3rem` |

### 4.6 Layout System

Derived from the Waveyu template, adapted for government portal content density:

| Layout | Class | Usage |
|---|---|---|
| **Split** | `layout-split` | Side-by-side content on desktop, stacked on mobile (e.g., text + image) |
| **Stack** | `layout-stack` | Single-column vertical stack (article content, forms) |
| **Grid** | `layout-grid` | 2-4 column responsive grid (service cards, team members) |
| **Cards** | `layout-cards` | Responsive multi-column card grid (news, gallery) |
| **Centered** | `layout-centered` | Centered single-column (hero sections, CTAs) |

### 4.7 Button Variants

| Variant | Style | Usage |
|---|---|---|
| **Primary** | Solid `accent` bg, white text, `radius-inner` | Main CTAs — "Ajukan Permohonan", "Buat Laporan" |
| **Primary Grey** | Solid `bg-subtle` bg, dark text | Secondary CTAs on light backgrounds |
| **Outlined** | Transparent bg, `accent` border | Actions on dark backgrounds |
| **Secondary** | Text + icon arrow, no bg | Supporting navigation — "Lihat Semua", "Pelajari Lebih" |
| **Tertiary** | Minimal text button | Inline actions — "Batal", "Kembali" |

All buttons include **hover state transitions** with Motion (Framer Motion) — background color shift and a subtle text-roll animation.

### 4.8 Animation Guidelines (Motion / Framer Motion)

| Pattern | Usage | Duration |
|---|---|---|
| **Fade-in-up** | Section reveals on scroll | `0.5s` ease-out |
| **Counter animation** | Statistics section numbers counting up | `1.5s` with easing |
| **Card hover lift** | Service cards, news cards | `0.2s` — subtle Y-translate + shadow |
| **Stagger children** | Card grids appearing sequentially | `0.1s` delay between items |
| **Page transitions** | Route changes | `0.3s` crossfade |
| **Map marker bounce** | Incident/area markers on map | `0.3s` spring |
| **Progress bar** | Form step indicators, SLA tracking | `0.4s` width transition |

> **Accessibility constraint:** All animations must respect `prefers-reduced-motion`. When the user's OS setting disables motion, all animations render instantly without transition.

---

## 5. Core Public Service Modules

### 5.1 Module A: Access & Research Permits (SIMAKSI)

**Route:** `/layanan/simaksi`

#### 5.1.1 Overview

SIMAKSI (Surat Izin Masuk Kawasan Konservasi) is the mandatory entry permit for anyone entering protected conservation areas — researchers, students, journalists, filmmakers, and service providers.

#### 5.1.2 User Flow

```
Landing Page (/layanan/simaksi)
  │
  ├── Information panel: What is SIMAKSI, who needs it, requirements
  ├── [Ajukan Permohonan →] button
  │
  ▼
Step 1: Applicant Type Selection
  │  ○ Peneliti (Researcher)
  │  ○ Mahasiswa (Student)
  │  ○ Wartawan (Journalist/Media)
  │  ○ Wisatawan (Tourist/Visitor)
  │  ○ Lainnya (Other — specify)
  │
  ▼
Step 2: Personal Information
  │  - Full name, ID number (KTP/Passport)
  │  - Institution/Affiliation
  │  - Email, Phone number
  │  - Nationality
  │
  ▼
Step 3: Visit Details
  │  - Target conservation area (dropdown of active areas)
  │  - Purpose of visit (text + category selection)
  │  - Entry date, Exit date
  │  - Number of team members (if group)
  │  - Equipment declaration (if research)
  │
  ▼
Step 4: Document Upload
  │  - Institutional recommendation letter (PDF, max 5MB)
  │  - Research proposal (if researcher)
  │  - ID scan (KTP/Passport)
  │  - Additional supporting documents
  │
  ▼
Step 5: Review & Submit
  │  - Summary of all entered data
  │  - Terms & conditions checkbox
  │  - [Kirim Permohonan] submit button
  │
  ▼
Confirmation Page
  │  - Unique tracking ID generated (format: SIMAKSI-YYYYMMDD-XXXX)
  │  - Estimated processing time displayed
  │  - Email confirmation sent
  │  - [Lacak Status →] link
  │
  ▼
Tracking Page (/layanan/simaksi/lacak)
     - Input tracking ID or email lookup
     - Status timeline: Diterima → Ditinjau → Disetujui/Ditolak
     - SLA indicator (target: 5 business days)
     - Download approved permit (PDF) when ready
```

#### 5.1.3 Form Technical Requirements

| Requirement | Implementation |
|---|---|
| Multi-step form | shadcn `Tabs` or stepper component with form state persistence |
| Validation | Zod schema validation per step, real-time field feedback |
| File upload | Drag-and-drop zone, file type/size validation client-side, preview |
| State persistence | Form data saved to `localStorage` on each step — resume if browser closed |
| Progress indicator | Step bar with numbered circles — current, completed, upcoming states |
| Confirmation email | Backend webhook triggers email with tracking ID (placeholder: log to console) |
| Tracking ID generation | Format `SIMAKSI-YYYYMMDD-XXXX` (placeholder: client-generated UUID) |

#### 5.1.4 Placeholder Data

```typescript
const SIMAKSI_AREAS = [
  { id: "ca-pegunungan-arfak", name: "Cagar Alam Pegunungan Arfak", type: "CA" },
  { id: "ca-tamrau-selatan", name: "Cagar Alam Tamrau Selatan", type: "CA" },
  { id: "ca-pulau-besar", name: "Cagar Alam Pulau Besar", type: "CA" },
  { id: "sm-pulau-kofiau", name: "Suaka Margasatwa Pulau Kofiau", type: "SM" },
  { id: "sm-sidei-wibeso", name: "Suaka Margasatwa Sidei Wibeso", type: "SM" },
  { id: "twa-sorong", name: "Taman Wisata Alam Sorong", type: "TWA" },
  { id: "twa-klamono", name: "Taman Wisata Alam Klamono", type: "TWA" },
  { id: "twa-gunung-meja", name: "Taman Wisata Alam Gunung Meja", type: "TWA" },
  { id: "tb-enarotali", name: "Taman Buru Enarotali", type: "TB" }
]

const SIMAKSI_STATUSES = ["diterima", "ditinjau", "verifikasi_dokumen", "disetujui", "ditolak"]
```

---

### 5.2 Module B: Flora & Fauna Permitting

**Route:** `/layanan/perizinan-flora-fauna`

#### 5.2.1 Overview

A unified permitting system for businesses and individuals seeking licenses related to wildlife management — covering breeding (penangkaran), domestic/international trade (peredaran), and transportation (pengangkutan) of protected and non-protected species.

#### 5.2.2 Permit Types

| Permit Type | Route Segment | Description | Typical Applicant |
|---|---|---|---|
| **Izin Penangkaran** | `/penangkaran` | Wildlife breeding facility license | Breeding farms, research institutions |
| **Izin Peredaran** | `/peredaran` | Trade quota allocation — domestic and CITES international | Exporters, pet shops, traders |
| **Izin Pengangkutan** | `/pengangkutan` | Transport permit for live specimens | Logistics, airlines, breeders |

#### 5.2.3 User Flow (Shared Pattern)

```
Landing Page (/layanan/perizinan-flora-fauna)
  │
  ├── Overview of available permit types (3 cards)
  ├── Regulatory references (PP 7/1999, UU 32/2024)
  ├── SLA & fee schedule table
  │
  ▼
Select Permit Type
  │
  ▼
Step 1: Applicant Entity
  │  - Individual / Company (toggle)
  │  - If Company: NPWP, NIB, Company name, address
  │  - If Individual: KTP, name, address
  │  - Contact person details
  │
  ▼
Step 2: Species Declaration
  │  - Species search (autocomplete from species database)
  │  - Protection status auto-displayed (Dilindungi / Tidak Dilindungi)
  │  - Quantity requested
  │  - Purpose (Komersial / Ilmiah / Edukasi / Konservasi)
  │  - CITES appendix auto-displayed if applicable
  │
  ▼
Step 3: Facility / Route Details
  │  - For Penangkaran: facility location, area, capacity, veterinarian
  │  - For Peredaran: origin facility, destination, quota year
  │  - For Pengangkutan: origin, destination, route, transport mode
  │
  ▼
Step 4: Document Upload
  │  - Business license / NIB
  │  - Facility photos (if breeding)
  │  - Previous permit (if renewal)
  │  - Transport vehicle documentation (if transport)
  │  - Health certificate from veterinarian
  │
  ▼
Step 5: Review & Submit → Tracking ID generated
```

#### 5.2.4 Species Autocomplete (Placeholder Data)

```typescript
const SPECIES_DATABASE = [
  {
    id: "paradisaea-rubra",
    scientificName: "Paradisaea rubra",
    localName: "Cenderawasih Merah",
    englishName: "Red Bird-of-Paradise",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Aves"
  },
  {
    id: "casuarius-casuarius",
    scientificName: "Casuarius casuarius",
    localName: "Kasuari Gelambir Ganda",
    englishName: "Southern Cassowary",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Aves"
  },
  {
    id: "chelodina-reimanni",
    scientificName: "Chelodina reimanni",
    localName: "Kura-kura Reimann",
    englishName: "Reimann's Snake-necked Turtle",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Reptilia"
  },
  {
    id: "varanus-prasinus",
    scientificName: "Varanus prasinus",
    localName: "Biawak Hijau",
    englishName: "Emerald Tree Monitor",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Reptilia"
  },
  {
    id: "dendrobium-spectabile",
    scientificName: "Dendrobium spectabile",
    localName: "Anggrek Tanduk Rusa",
    englishName: "Spectacular Dendrobium",
    protectionStatus: "dilindungi",
    citesAppendix: "II",
    taxonClass: "Plantae"
  },
  {
    id: "pteropus-neohibernicus",
    scientificName: "Pteropus neohibernicus",
    localName: "Kalong Papua",
    englishName: "Great Flying Fox",
    protectionStatus: "tidak_dilindungi",
    citesAppendix: null,
    taxonClass: "Mammalia"
  }
]
```

---

### 5.3 Module C: Incident Reporting (Human-Wildlife Conflict & Forest Fires)

**Route:** `/layanan/laporan-insiden`

#### 5.3.1 Overview

A real-time, public-facing incident reporting system enabling citizens to report human-wildlife conflicts (HWC), forest fires, illegal logging, poaching, and other environmental disturbances. Reports are geotagged using an integrated map interface, and every submission generates a trackable ticket with SLA commitments.

#### 5.3.2 User Flow

```
Landing Page (/layanan/laporan-insiden)
  │
  ├── Incident type cards (visual, icon-driven)
  │   ├── Konflik Satwa Liar (Human-Wildlife Conflict)
  │   ├── Kebakaran Hutan (Forest Fire)
  │   ├── Pembalakan Liar (Illegal Logging)
  │   ├── Perburuan Liar (Poaching)
  │   └── Lainnya (Other)
  │
  ├── Recent resolved incidents ticker (public transparency)
  │
  ▼
Report Form (/layanan/laporan-insiden/buat)
  │
  Step 1: Incident Type + Urgency
  │  - Type (from above categories)
  │  - Urgency: Darurat (Emergency) / Segera (Urgent) / Normal
  │  - Date & time of incident
  │
  Step 2: Location (Map Interface)
  │  ┌─────────────────────────────────────┐
  │  │                                     │
  │  │    Interactive Map (Leaflet)         │
  │  │    - Click/tap to drop pin          │
  │  │    - GPS auto-detect button         │
  │  │    - Search by place name           │
  │  │    - Conservation area boundaries   │
  │  │      overlaid as polygons           │
  │  │                                     │
  │  └─────────────────────────────────────┘
  │  - Auto-populated: lat, lng, nearest area
  │  - Manual fallback: province, regency, district, village dropdowns
  │
  Step 3: Description + Evidence
  │  - Incident description (textarea, min 50 chars)
  │  - Photo upload (up to 5 images, max 10MB each)
  │  - Optional: video upload (max 50MB)
  │  - Number of animals involved (if HWC)
  │  - Species identification (if known — autocomplete)
  │  - Casualties/damage estimate
  │
  Step 4: Reporter Information
  │  - Full name (optional for anonymous reports)
  │  - Phone number (required for emergency follow-up)
  │  - Email (optional)
  │  - Preferred contact method
  │
  ▼
Confirmation
  │  - Ticket ID generated: INC-YYYYMMDD-XXXX
  │  - SLA displayed based on urgency:
  │     Darurat: Response within 2 hours
  │     Segera: Response within 24 hours
  │     Normal: Response within 72 hours
  │  - SMS/Email notification sent
  │
  ▼
Public Tracking (/layanan/laporan-insiden/lacak)
     - Ticket lookup by ID or phone number
     - Timeline: Dilaporkan → Ditinjau → Ditindaklanjuti → Selesai
     - SLA countdown timer with visual indicator
     - Officer response notes (public-safe portion)
```

#### 5.3.3 Map Integration Requirements

| Requirement | Implementation |
|---|---|
| Map Library | **Leaflet** with OpenStreetMap tiles (free, no API key friction) |
| Conservation area overlays | GeoJSON polygons for all 27+ areas (placeholder: simplified boundaries) |
| Geolocation | Browser Geolocation API with fallback to manual address |
| Reverse geocoding | Nominatim (open-source) or placeholder coordinate display |
| Offline fallback | If map fails to load, show manual location dropdowns |
| Mobile pinch-zoom | Touch-optimized map controls |

#### 5.3.4 Placeholder Data

```typescript
const INCIDENT_TYPES = [
  { id: "hwc", label: "Konflik Satwa Liar", icon: "Crocodile", color: "warning" },
  { id: "fire", label: "Kebakaran Hutan", icon: "Flame", color: "danger" },
  { id: "logging", label: "Pembalakan Liar", icon: "Axe", color: "danger" },
  { id: "poaching", label: "Perburuan Liar", icon: "Target", color: "danger" },
  { id: "other", label: "Lainnya", icon: "FileText", color: "info" }
]

const SLA_TARGETS = {
  darurat: { responseHours: 2, resolutionHours: 24 },
  segera: { responseHours: 24, resolutionHours: 72 },
  normal: { responseHours: 72, resolutionHours: 168 }
}

const RECENT_INCIDENTS = [
  {
    id: "INC-20260410-0012",
    type: "hwc",
    summary: "Buaya muara terlihat di sungai dekat pemukiman",
    location: "Kab. Sorong, Distrik Aimas",
    status: "selesai",
    reportedAt: "2026-04-10T08:30:00+09:00",
    resolvedAt: "2026-04-10T14:15:00+09:00"
  },
  {
    id: "INC-20260408-0007",
    type: "fire",
    summary: "Titik api terdeteksi di kawasan penyangga CA Tamrau",
    location: "Kab. Tambrauw, Distrik Fef",
    status: "ditindaklanjuti",
    reportedAt: "2026-04-08T14:00:00+09:00"
  }
]
```

---

### 5.4 Module D: E-Ticketing / Eco-Tourism Booking

**Route:** `/layanan/tiket-wisata`

#### 5.4.1 Overview

An online booking and (future) payment system for public nature reserves and eco-tourism sites managed by BBKSDA Papua Barat Daya. Covers entrance tickets, guided tour packages, and accommodation within managed areas (TWA — Taman Wisata Alam).

#### 5.4.2 User Flow

```
Browse Areas (/layanan/tiket-wisata)
  │
  ├── Grid of bookable areas with:
  │   - Hero photo
  │   - Area name and type (TWA)
  │   - Starting price per person
  │   - Rating/review summary (placeholder)
  │   - [Pesan Tiket →] button
  │
  ▼
Area Detail (/layanan/tiket-wisata/[area-slug])
  │
  ├── Photo gallery (lightbox-enabled)
  ├── Description, facilities, rules
  ├── Location map
  ├── Available packages:
  │   ┌─────────────────────────────┐
  │   │ Tiket Masuk Reguler         │
  │   │ Rp 15.000 / orang           │
  │   │ Domestik                     │
  │   │ [+ Tambah]                   │
  │   ├─────────────────────────────┤
  │   │ Tiket Masuk Wisatawan Asing  │
  │   │ Rp 150.000 / orang          │
  │   │ Internasional                │
  │   │ [+ Tambah]                   │
  │   ├─────────────────────────────┤
  │   │ Paket Tur Berpemandu         │
  │   │ Rp 500.000 / grup (max 10)  │
  │   │ Termasuk guide + peralatan   │
  │   │ [+ Tambah]                   │
  │   └─────────────────────────────┘
  │
  ▼
Booking Form
  │  - Select date (calendar picker — unavailable dates greyed out)
  │  - Number of visitors per ticket type
  │  - Lead visitor name, phone, email
  │  - Group member list (if >5)
  │  - Special requirements (textarea)
  │
  ▼
Order Summary
  │  - Itemized breakdown
  │  - PNBP fee explanation
  │  - Total price
  │  - Terms & conditions agreement
  │
  ▼
Payment (Placeholder)
  │  ┌─────────────────────────────────────────────┐
  │  │  Payment integration is planned for Phase 2  │
  │  │  Current: Generate booking reference and      │
  │  │  display bank transfer instructions (manual)  │
  │  │                                               │
  │  │  Future: Midtrans payment gateway with:       │
  │  │  - QRIS                                       │
  │  │  - Virtual Account (BNI, BRI, Mandiri)        │
  │  │  - GoPay, OVO, DANA                           │
  │  │  - Credit/Debit Card                          │
  │  └─────────────────────────────────────────────┘
  │
  ▼
Booking Confirmation
  │  - Booking ID: TWA-YYYYMMDD-XXXX
  │  - QR code for entry (downloadable + emailed)
  │  - Calendar invite (.ics) download
  │  - Payment instructions (if manual)
  │
  ▼
My Bookings (/layanan/tiket-wisata/pesanan)
     - Lookup by booking ID or email
     - List of upcoming and past bookings
     - Cancel/reschedule option (with policy terms)
     - Download e-ticket (PDF with QR)
```

#### 5.4.3 Placeholder Data

```typescript
const ECO_TOURISM_AREAS = [
  {
    slug: "twa-sorong",
    name: "Taman Wisata Alam Sorong",
    description: "Hutan tropis dengan air terjun dan jalur trekking sepanjang 5km.",
    location: { lat: -0.8833, lng: 131.2500, regency: "Kota Sorong" },
    heroImage: "/placeholder/twa-sorong-hero.jpg",
    gallery: ["/placeholder/twa-sorong-1.jpg", "/placeholder/twa-sorong-2.jpg"],
    facilities: ["Jalur trekking", "Shelter", "Toilet umum", "Area parkir"],
    rules: ["Dilarang membuang sampah", "Dilarang membawa api", "Wajib didampingi guide untuk jalur B"],
    packages: [
      { id: "regular-dom", name: "Tiket Masuk Domestik", price: 15000, currency: "IDR", unit: "orang", maxQty: 50 },
      { id: "regular-int", name: "Tiket Masuk Internasional", price: 150000, currency: "IDR", unit: "orang", maxQty: 20 },
      { id: "guided-tour", name: "Paket Tur Berpemandu", price: 500000, currency: "IDR", unit: "grup", maxQty: 5, maxGroupSize: 10 }
    ],
    operatingHours: "06:00 - 17:00 WIT",
    closedDays: [],
    rating: 4.5,
    reviewCount: 128
  },
  {
    slug: "twa-gunung-meja",
    name: "Taman Wisata Alam Gunung Meja",
    description: "Area konservasi perkotaan dengan hutan hujan dataran rendah dan keanekaragaman anggrek.",
    location: { lat: -0.8700, lng: 134.0800, regency: "Kota Manokwari" },
    heroImage: "/placeholder/twa-gunung-meja-hero.jpg",
    gallery: ["/placeholder/twa-gunung-meja-1.jpg"],
    facilities: ["Jalur trekking", "Menara pandang", "Pusat informasi"],
    rules: ["Dilarang memetik tanaman", "Dilarang memberi makan satwa"],
    packages: [
      { id: "regular-dom", name: "Tiket Masuk Domestik", price: 10000, currency: "IDR", unit: "orang", maxQty: 100 },
      { id: "regular-int", name: "Tiket Masuk Internasional", price: 100000, currency: "IDR", unit: "orang", maxQty: 30 }
    ],
    operatingHours: "07:00 - 16:00 WIT",
    closedDays: ["Senin"],
    rating: 4.2,
    reviewCount: 89
  },
  {
    slug: "twa-klamono",
    name: "Taman Wisata Alam Klamono",
    description: "Danau alami dikelilingi hutan tropis, habitat burung air dan reptil endemik.",
    location: { lat: -1.1167, lng: 131.3333, regency: "Kab. Sorong" },
    heroImage: "/placeholder/twa-klamono-hero.jpg",
    gallery: [],
    facilities: ["Area piknik", "Shelter", "Dermaga"],
    rules: ["Dilarang berenang", "Dilarang memancing tanpa izin"],
    packages: [
      { id: "regular-dom", name: "Tiket Masuk Domestik", price: 10000, currency: "IDR", unit: "orang", maxQty: 80 },
      { id: "regular-int", name: "Tiket Masuk Internasional", price: 100000, currency: "IDR", unit: "orang", maxQty: 20 }
    ],
    operatingHours: "06:00 - 17:00 WIT",
    closedDays: [],
    rating: 4.0,
    reviewCount: 45
  }
]
```

---

### 5.5 Universal Ticket Tracker

**Route:** `/layanan/lacak`

A single entry point to track **any** service request across all modules.

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Lacak Status Permohonan Anda                   │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │  Masukkan Nomor Tiket                   │    │
│  │     SIMAKSI-20260415-0001              │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  atau                                           │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │  Cari berdasarkan Email                 │    │
│  │     email@contoh.com                    │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  [Lacak →]                                      │
│                                                 │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                 │
│  Hasil:                                         │
│  ┌─────────────────────────────────────────┐    │
│  │  SIMAKSI-20260415-0001                  │    │
│  │  Jenis: Izin Masuk Kawasan              │    │
│  │  Kawasan: CA Pegunungan Arfak           │    │
│  │  Diajukan: 15 April 2026               │    │
│  │                                         │    │
│  │  ● Diterima ─── ● Ditinjau ─── ○ Selesai│   │
│  │    15 Apr         16 Apr         -      │    │
│  │                                         │    │
│  │  SLA: 3 hari tersisa (dari 5 hari kerja)│    │
│  │                                         │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 6. Engagement & Supporting Features

### 6.1 Conservation Areas Explorer

**Route:** `/kawasan`

| Feature | Description |
|---|---|
| **Interactive Map** | Full-page Leaflet map showing all 27+ conservation areas as clickable markers/polygons |
| **Area Cards** | Grid of cards with hero image, name, type (CA/SM/TWA/TB), area size, and quick stats |
| **Detail Pages** | `/kawasan/[area-slug]` — photo gallery, description, biodiversity highlights, access info, legal basis (SK Penunjukan/Penetapan) |
| **Filter & Search** | Filter by type (Cagar Alam, Suaka Margasatwa, TWA, Taman Buru), regency, or keyword |

### 6.2 Biodiversity Gallery

**Route:** `/galeri`

A digital museum of Papua Barat Daya's endemic and notable species.

| Feature | Description |
|---|---|
| **Species Cards** | Photo, scientific name, local name, English name, protection status badge |
| **Filter Tabs** | Flora / Fauna (further: Aves, Mammalia, Reptilia, Amphibia, Insecta, Plantae) |
| **Detail Pages** | `/galeri/[species-slug]` — full description, habitat, distribution, conservation status (IUCN/CITES), photo gallery |
| **Search** | Autocomplete search by scientific name, local name, or English name |
| **Data Source** | Placeholder JSON — designed for future API integration with KSDAE species database |

### 6.3 Education & Downloads

**Route:** `/edukasi`

| Section | Content |
|---|---|
| **Conservation Programs** | Active programs with descriptions, timelines, partner logos (e.g., reforestation, anti-poaching patrols) |
| **Downloadable Resources** | Forms (blank permit applications), regulation PDFs, annual reports, infographics |
| **FAQ / Help Center** | Accordion-style FAQ organized by category: Permits, Visits, Reporting, General |

### 6.4 Interactive FAQ & Chatbot

| Feature | Phase | Description |
|---|---|---|
| **Searchable FAQ** | Phase 1 | Filterable accordion with categories, keyword search |
| **AI Chatbot** | Phase 3 | Widget in bottom-right corner, trained on FAQ data, escalation to WhatsApp/email for complex queries |

---

## 7. News & Press Release Module

**Route:** `/berita`

### 7.1 Content Management System (CMS)

#### 7.1.1 Admin Dashboard Requirements

| Feature | Description |
|---|---|
| **Rich Text Editor** | Block-based editor (Tiptap or similar) with heading, paragraph, bold, italic, link, image, video embed, blockquote, ordered/unordered list, code block |
| **Draft / Publish / Archive** | 3-state lifecycle with scheduled publishing (set future publish date) |
| **Media Library** | Upload, browse, and insert images/videos. Bulk upload support. Metadata editing (alt text, caption) |
| **Categories** | Predefined: Pengumuman, Siaran Pers, Kegiatan Lapangan, Kisah Sukses Konservasi, Edukasi. Staff can add new categories |
| **Tags** | Free-form tagging with autocomplete on existing tags |
| **Author Attribution** | Auto-assigned to logged-in staff. Override capability for guest contributors |
| **Revision History** | Track changes per article with rollback capability |
| **Preview Mode** | View article as it will appear on the public site before publishing |

> **Note:** For Phase 1, the CMS admin panel can be a simple protected route (`/admin/berita`). Full-featured admin is Phase 2.

#### 7.1.2 Placeholder Data

```typescript
const NEWS_CATEGORIES = [
  { slug: "pengumuman", name: "Pengumuman", description: "Informasi resmi dan pemberitahuan publik" },
  { slug: "siaran-pers", name: "Siaran Pers", description: "Press releases resmi BBKSDA PBD" },
  { slug: "kegiatan-lapangan", name: "Kegiatan Lapangan", description: "Laporan kegiatan di kawasan konservasi" },
  { slug: "kisah-konservasi", name: "Kisah Sukses Konservasi", description: "Cerita keberhasilan program konservasi" },
  { slug: "edukasi", name: "Edukasi", description: "Konten edukatif untuk masyarakat" }
]

const SAMPLE_ARTICLES = [
  {
    slug: "pelepasliaran-kasuari-tambrauw-2026",
    title: "Pelepasliaran Kasuari di Kawasan Tambrauw Berhasil Dilakukan",
    excerpt: "Tim BBKSDA Papua Barat Daya berhasil melepasliarkan 3 ekor kasuari gelambir ganda...",
    category: "kisah-konservasi",
    tags: ["kasuari", "rewilding", "tambrauw"],
    author: { name: "Humas BBKSDA PBD", avatar: "/placeholder/avatar-humas.jpg" },
    publishedAt: "2026-04-10T09:00:00+09:00",
    featuredImage: "/placeholder/kasuari-release.jpg",
    readingTime: 5,
    status: "published"
  },
  {
    slug: "pengumuman-jam-operasional-lebaran-2026",
    title: "Pengumuman Jam Operasional TWA Selama Periode Lebaran 2026",
    excerpt: "Sehubungan dengan libur nasional Hari Raya Idul Fitri 1447 H...",
    category: "pengumuman",
    tags: ["twa", "jam-operasional", "lebaran"],
    author: { name: "Humas BBKSDA PBD", avatar: "/placeholder/avatar-humas.jpg" },
    publishedAt: "2026-04-05T08:00:00+09:00",
    featuredImage: "/placeholder/twa-lebaran.jpg",
    readingTime: 2,
    status: "published"
  },
  {
    slug: "patroli-gabungan-anti-perburuan-raja-ampat",
    title: "Patroli Gabungan Anti-Perburuan Liar di Perairan Raja Ampat",
    excerpt: "BBKSDA PBD bersama TNI-AL dan Polairud melaksanakan patroli gabungan...",
    category: "kegiatan-lapangan",
    tags: ["patroli", "raja-ampat", "anti-perburuan"],
    author: { name: "Resort KK Raja Ampat", avatar: "/placeholder/avatar-resort.jpg" },
    publishedAt: "2026-04-01T10:30:00+09:00",
    featuredImage: "/placeholder/patroli-raja-ampat.jpg",
    readingTime: 4,
    status: "published"
  }
]
```

### 7.2 Public-Facing Article Page

**Route:** `/berita/[slug]`

```
┌─────────────────────────────────────────────┐
│  Breadcrumb: Beranda > Berita > Kategori    │
│                                             │
│  CATEGORY BADGE        5 min read           │
│                                             │
│  # Article Title in Bricolage Grotesque     │
│                                             │
│  Author avatar | Name | Date                │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │                                         ││
│  │         FEATURED IMAGE                  ││
│  │         (optimized Next.js Image)       ││
│  │                                         ││
│  └─────────────────────────────────────────┘│
│  Caption text                               │
│                                             │
│  Article body content with:                 │
│  - Responsive images (next/image)           │
│  - Embedded video (lazy-loaded iframe)      │
│  - Pull quotes styled as blockquotes        │
│  - In-article CTAs where relevant           │
│                                             │
│  ──────────────────────────────             │
│  Tags: [kasuari] [rewilding] [tambrauw]     │
│                                             │
│  Share: [WhatsApp] [Facebook] [X] [Copy]    │
│                                             │
│  ──────────────────────────────             │
│  Related Articles (3 cards)                 │
│                                             │
└─────────────────────────────────────────────┘
```

### 7.3 SEO & Discoverability

| Feature | Implementation |
|---|---|
| **Dynamic `<title>`** | `{Article Title} \| Berita BBKSDA Papua Barat Daya` |
| **Meta description** | Auto-generated from `excerpt` field, max 155 chars |
| **Open Graph tags** | `og:title`, `og:description`, `og:image` (featured image), `og:url` |
| **Twitter Card** | `twitter:card=summary_large_image` |
| **Canonical URL** | Self-referencing canonical to prevent duplicate content |
| **Structured data** | JSON-LD `Article` schema with author, datePublished, publisher |
| **XML Sitemap** | Auto-generated at `/sitemap.xml` including all published articles |
| **RSS Feed** | `/berita/rss.xml` — Atom/RSS feed of latest 50 articles |
| **Search** | Client-side full-text search across article titles, excerpts, tags |

### 7.4 Media Handling

| Requirement | Implementation |
|---|---|
| **Image optimization** | `next/image` with automatic WebP/AVIF conversion, responsive `srcset` |
| **Lazy loading** | All below-fold images use native `loading="lazy"` |
| **Blur placeholder** | `blurDataURL` generated at build time for featured images |
| **Video embedding** | YouTube/Vimeo embeds via `lite-youtube-embed` (1KB vs 600KB for standard iframe) |
| **Image gallery** | Lightbox component with swipe navigation and zoom |
| **Max upload sizes** | Images: 10MB, Videos: 100MB (for CMS upload) |
| **CDN** | Static assets served via CDN with immutable cache headers |

---

## 8. Technical Architecture

### 8.1 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Full-stack React framework with SSR/SSG/ISR |
| **UI Library** | shadcn/ui | Accessible, composable component primitives |
| **Styling** | Tailwind CSS 4 | Utility-first CSS with design token integration |
| **Animation** | Motion (Framer Motion) | Declarative animations — page transitions, scroll reveals, micro-interactions |
| **Font** | Bricolage Grotesque (Google Fonts) | Primary typeface — all headings and body |
| **Map** | Leaflet + react-leaflet | Interactive maps for areas and incident reporting |
| **Forms** | React Hook Form + Zod | Performant forms with schema-based validation |
| **Icons** | Lucide React | Consistent icon system matching shadcn/ui |
| **Date Handling** | date-fns | Lightweight date formatting and manipulation |
| **Data** | Placeholder JSON/TypeScript files | Phase 1 — static data, designed for future API swapout |
| **Language** | TypeScript (strict mode) | Type safety across the entire frontend |

### 8.2 Rendering Strategy

| Route Pattern | Strategy | Rationale |
|---|---|---|
| `/` (Homepage) | **SSG** + ISR (revalidate: 3600s) | Mostly static, news section revalidates hourly |
| `/layanan/*` | **SSG** | Static forms, no server data needed |
| `/kawasan` | **SSG** | Conservation area data changes infrequently |
| `/kawasan/[slug]` | **SSG** with `generateStaticParams` | Pre-generated at build for all areas |
| `/berita` | **ISR** (revalidate: 600s) | News list updates frequently |
| `/berita/[slug]` | **ISR** (revalidate: 1800s) | Individual articles, regenerated on demand |
| `/galeri` | **SSG** | Species data is static placeholder |
| `/layanan/lacak` | **Client-side** | Dynamic ticket lookup — client fetches on submit |
| `/admin/*` | **Client-side** (protected) | Admin CMS — future phase, SPA pattern |

### 8.3 Project Structure

```
web/
├── app/
│   ├── layout.tsx                  # Root layout — font, metadata, navbar, footer
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Tailwind imports + CSS custom properties
│   │
│   ├── layanan/
│   │   ├── page.tsx                # Services hub
│   │   ├── simaksi/
│   │   │   ├── page.tsx            # SIMAKSI info + entry
│   │   │   ├── ajukan/page.tsx     # Application form
│   │   │   └── lacak/page.tsx      # Track status
│   │   ├── perizinan-flora-fauna/
│   │   │   ├── page.tsx            # Permit type selection
│   │   │   ├── penangkaran/page.tsx
│   │   │   ├── peredaran/page.tsx
│   │   │   └── pengangkutan/page.tsx
│   │   ├── laporan-insiden/
│   │   │   ├── page.tsx            # Incident reporting hub
│   │   │   ├── buat/page.tsx       # Report form
│   │   │   └── lacak/page.tsx      # Track report
│   │   ├── tiket-wisata/
│   │   │   ├── page.tsx            # Browse bookable areas
│   │   │   ├── [slug]/page.tsx     # Area detail + booking
│   │   │   └── pesanan/page.tsx    # My bookings
│   │   └── lacak/page.tsx          # Universal tracker
│   │
│   ├── profil/
│   │   ├── tentang-kami/page.tsx
│   │   ├── visi-misi/page.tsx
│   │   ├── struktur-organisasi/page.tsx
│   │   ├── wilayah-kerja/page.tsx
│   │   └── kontak/page.tsx
│   │
│   ├── kawasan/
│   │   ├── page.tsx                # All areas grid + map
│   │   ├── [slug]/page.tsx         # Area detail
│   │   └── peta/page.tsx           # Full-page interactive map
│   │
│   ├── berita/
│   │   ├── page.tsx                # News listing
│   │   ├── [slug]/page.tsx         # Article detail
│   │   ├── kategori/[category]/page.tsx
│   │   └── rss.xml/route.ts        # RSS feed route handler
│   │
│   ├── galeri/
│   │   ├── page.tsx                # Gallery grid
│   │   ├── flora/page.tsx
│   │   ├── fauna/page.tsx
│   │   └── [slug]/page.tsx         # Species detail
│   │
│   ├── edukasi/
│   │   ├── program-konservasi/page.tsx
│   │   ├── unduh/page.tsx
│   │   └── faq/page.tsx
│   │
│   ├── regulasi/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── unduh/page.tsx
│   │
│   └── sitemap.ts                  # Dynamic sitemap generation
│
├── components/
│   ├── ui/                         # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── calendar.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── breadcrumb.tsx
│   │
│   ├── sections/                   # Homepage sections
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── areas-showcase.tsx
│   │   ├── latest-news.tsx
│   │   ├── biodiversity-spotlight.tsx
│   │   ├── statistics-counter.tsx
│   │   └── cta-banner.tsx
│   │
│   ├── forms/
│   │   ├── simaksi-form.tsx
│   │   ├── fauna-permit-form.tsx
│   │   ├── incident-report-form.tsx
│   │   ├── booking-form.tsx
│   │   ├── ticket-tracker.tsx
│   │   └── multi-step-wrapper.tsx  # Shared multi-step form shell
│   │
│   ├── maps/
│   │   ├── area-map.tsx            # Conservation areas overview map
│   │   ├── incident-map.tsx        # Pin-drop incident reporting map
│   │   └── map-provider.tsx        # Leaflet provider with lazy loading
│   │
│   └── shared/
│       ├── species-search.tsx      # Autocomplete species selector
│       ├── file-upload.tsx         # Drag-and-drop upload zone
│       ├── status-timeline.tsx     # Ticket status visualization
│       ├── sla-indicator.tsx       # SLA countdown bar
│       ├── share-buttons.tsx       # Social sharing
│       └── scroll-reveal.tsx       # Motion scroll-triggered animations
│
├── data/                           # Placeholder data (Phase 1)
│   ├── areas.ts
│   ├── species.ts
│   ├── news.ts
│   ├── incidents.ts
│   ├── eco-tourism.ts
│   ├── faq.ts
│   ├── regulations.ts
│   └── organization.ts
│
├── lib/
│   ├── utils.ts                    # shadcn utility (cn function)
│   ├── schemas/                    # Zod validation schemas
│   │   ├── simaksi.ts
│   │   ├── fauna-permit.ts
│   │   ├── incident-report.ts
│   │   └── booking.ts
│   ├── constants.ts                # App-wide constants, SLA targets
│   └── format.ts                   # Date, currency, coordinate formatters
│
├── hooks/
│   ├── use-geolocation.ts
│   ├── use-local-storage.ts        # Form persistence
│   └── use-scroll-reveal.ts        # Intersection observer for animations
│
├── public/
│   ├── logo.svg
│   ├── og-image.jpg
│   ├── placeholder/                # Placeholder images
│   └── geojson/                    # Conservation area boundaries
│       └── conservation-areas.json
│
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── components.json                 # shadcn/ui config
```

### 8.4 Key Dependencies

```jsonc
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "motion": "^12.x",
    "leaflet": "^1.9.x",
    "react-leaflet": "^5.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^4.x",
    "zod": "^3.x",
    "date-fns": "^4.x",
    "lucide-react": "^0.470.x",
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "tailwind-merge": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x",
    "@types/leaflet": "^1.9.x",
    "@types/react": "^19.x",
    "@types/node": "^22.x",
    "eslint": "^9.x",
    "eslint-config-next": "^15.x"
  }
}
```

---

## 9. Accessibility & Compliance

### 9.1 WCAG 2.2 Level AA Targets

| Criterion | Requirement | Implementation |
|---|---|---|
| **1.1.1 Non-text Content** | All images have descriptive alt text | `next/image` with mandatory `alt` prop; CMS enforces alt text on upload |
| **1.3.1 Info and Relationships** | Semantic HTML structure | Proper heading hierarchy (h1-h6), landmark roles, form labels |
| **1.4.3 Contrast** | Minimum 4.5:1 for body text, 3:1 for large text | Verified against color palette; forest green on white passes 4.5:1+ |
| **1.4.4 Resize Text** | Content readable at 200% zoom | Fully responsive layout, no fixed-width text containers |
| **2.1.1 Keyboard** | All interactive elements keyboard-accessible | shadcn/ui components are keyboard-accessible by default; tab order tested |
| **2.4.7 Focus Visible** | Clear focus indicators | Custom focus ring: `ring-2 ring-offset-2 ring-accent` |
| **3.1.1 Language** | Page language declared | `<html lang="id">` with `lang="en"` attribute on English sections |
| **3.3.1 Error Identification** | Form errors clearly identified | Zod validation errors rendered inline with `aria-describedby` |
| **4.1.2 Name, Role, Value** | All components have accessible names | ARIA labels on icon-only buttons, map controls, modals |

### 9.2 SPBE Compliance Alignment

| SPBE Principle | Website Implementation |
|---|---|
| **Layanan Publik Digital** | All 4 public services available as online self-service flows |
| **Interoperabilitas** | API-ready data layer (JSON); structured data and RSS for content syndication |
| **Keamanan Informasi** | HTTPS-only; input sanitization; CSRF protection on forms |
| **Keterbukaan** | Public ticket tracking with SLA transparency; regulation repository |
| **Efisiensi** | Reduced manual processing through digital intake; automated acknowledgment |

### 9.3 Mobile-First & Low-Bandwidth Considerations

| Feature | Strategy |
|---|---|
| **Responsive design** | Mobile-first breakpoints in Tailwind. All features functional at 320px width |
| **Image optimization** | WebP/AVIF auto-conversion, responsive `srcset`, aggressive lazy loading |
| **Bundle size** | Code splitting per route; Leaflet loaded dynamically only on map pages |
| **Offline resilience** | Incident report form saves to `localStorage`; can resubmit when online |
| **Low-end devices** | Animations disabled for `prefers-reduced-motion`; no heavy JS on listing pages |

---

## 10. Performance Requirements

### 10.1 Core Web Vitals Targets

| Metric | Target | Measurement |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5 seconds | Hero image on homepage |
| **FID** (First Input Delay) | < 100 milliseconds | First button click interaction |
| **CLS** (Cumulative Layout Shift) | < 0.1 | No layout shifts from image/font loading |
| **TTFB** (Time to First Byte) | < 800 milliseconds | SSG pages served from CDN edge |
| **FCP** (First Contentful Paint) | < 1.8 seconds | Initial text/layout render |

### 10.2 Bundle Budget

| Route | Max JS Bundle (gzipped) |
|---|---|
| Homepage | < 150 KB |
| Article page | < 100 KB |
| Map pages | < 250 KB (Leaflet included) |
| Form pages | < 200 KB (form lib + validation) |

### 10.3 Image Performance

| Type | Format | Max Weight | Dimensions |
|---|---|---|---|
| Hero images | WebP/AVIF | 200 KB | 1920x1080 (with `srcset` variants) |
| News thumbnails | WebP | 50 KB | 600x400 |
| Species gallery | WebP | 150 KB | 1200x800 |
| Author avatars | WebP | 10 KB | 80x80 |

---

## 11. Phased Delivery Roadmap

### Phase 1 — Foundation (Weeks 1-6)

**Goal:** Live website with information architecture, design system, and static content.

| Deliverable | Routes |
|---|---|
| Project scaffold (Next.js + shadcn + Tailwind + Motion) | — |
| Design system implementation (colors, typography, components) | — |
| Homepage with all sections | `/` |
| Agency profile pages | `/profil/*` |
| Conservation areas (static data + map) | `/kawasan/*` |
| News module (SSG from placeholder data) | `/berita/*` |
| Biodiversity gallery (static) | `/galeri/*` |
| Education & downloads | `/edukasi/*` |
| Regulations page | `/regulasi/*` |
| SEO foundations (sitemap, meta, structured data, RSS) | Various |

### Phase 2 — Public Services (Weeks 7-12)

**Goal:** All 4 public service modules live with placeholder backends.

| Deliverable | Routes |
|---|---|
| SIMAKSI application form (multi-step) | `/layanan/simaksi/*` |
| Flora & fauna permit forms | `/layanan/perizinan-flora-fauna/*` |
| Incident reporting with map | `/layanan/laporan-insiden/*` |
| E-ticketing and booking flow | `/layanan/tiket-wisata/*` |
| Universal ticket tracker | `/layanan/lacak` |
| Form data persistence (localStorage) | All forms |
| Email notifications (placeholder: console logs) | All submissions |

### Phase 3 — Integration & Polish (Weeks 13-18)

**Goal:** Backend API integration, payment system, and production hardening.

| Deliverable | Description |
|---|---|
| Go backend API integration | Replace placeholder data with live API calls to Vogelkop Data Center backend |
| Payment gateway (Midtrans) | QRIS, VA, e-wallet for e-ticketing |
| Admin CMS dashboard | Protected routes for content management |
| Email/SMS notifications | Actual notification delivery for all services |
| Analytics integration | Privacy-respecting analytics (Plausible or Umami) |
| Performance optimization | Lighthouse audit, bundle optimization, image pipeline |
| Accessibility audit | WCAG 2.2 AA compliance verification |
| Security hardening | CSRF, rate limiting, input sanitization, CSP headers |

### Phase 4 — Enhancement (Post-Launch)

| Feature | Description |
|---|---|
| Bilingual support (ID/EN) | `next-intl` or equivalent i18n integration |
| AI Chatbot | FAQ-trained assistant with escalation to human agent |
| PWA capabilities | Service worker for offline incident reporting |
| Dashboard analytics | Public statistics page (visitor counts, species observed, permits processed) |
| Feedback system | Post-service satisfaction survey |

---

<div align="center">

---

**Vogelkop Data Center** · Product Requirements Document

_Balai Besar KSDA Papua Barat Daya_

**Document Owner:** Development Team · **Status:** Draft · **Classification:** Internal

---

</div>
