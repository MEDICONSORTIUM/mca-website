<div align="center">

  <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /><br/>
  <img src="https://img.shields.io/badge/-Resend-000000?style=for-the-badge&logo=maildotru&logoColor=white" />
  <img src="https://img.shields.io/badge/-Google_Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white" />
  <img src="https://img.shields.io/badge/-WCAG_2.1_AA-2C2C2C?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-POPIA_Compliant-C85A1A?style=for-the-badge" />

  <h3 align="center">Medical Consortium of Africa — Public Website</h3>

  <div align="center">
    A modern, statically-rendered Next.js marketing site introducing the Medical Consortium of Africa (MCA) and its Earth Observation Health Analytics (EOHA) research platform to the public, researchers, and partner institutions.
  </div>

</div>

## 📋 Table of Contents

- [Project Purpose](#project-purpose)
- [Platform Overview](#platform-overview)
- [System Actors](#system-actors)
- [Pages & Features](#pages--features)
  - [Home Page](#home-page-)
  - [About Page](#about-page-about)
  - [Partners Page](#partners-page-partners)
  - [Contact Page](#contact-page-contact)
- [Non-Functional Requirements](#non-functional-requirements)
- [Integration Requirements](#integration-requirements)
- [Reporting & Analytics](#reporting--analytics)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Brand Reference](#brand-reference)
- [Component Inventory](#component-inventory)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Open Issues](#open-issues)
- [Related Documents](#related-documents)

## Project Purpose

Medical Consortium of Africa (PTY) LTD is an organisation dedicated to advancing health outcomes across the African continent through the application of Earth Observation (EO) technologies and data-driven health analytics. The consortium operates the **Earth Observation Health Analytics (EOHA)** platform, developed in collaboration with academic, scientific, and institutional partners.

This repository contains the official public-facing website for Medical Consortium of Africa, the organisation's primary digital presence. The site communicates MCA's mission, capabilities, and partnerships to the general public, researchers, and partner institutions, and directs qualified users toward the EOHA platform.

> **Scope note:** This website is a marketing/informational site only. It is **not** a data portal, research platform, or authenticated application. The EOHA prototype is an external system, referenced here via a hyperlink CTA only. No CMS is required at launch, all content is static and code-managed.

## Platform Overview

The site is a statically-rendered **Next.js (App Router)** application comprising four primary pages. It takes visual and structural inspiration from the [SANSA public website](https://www.sansa.org.za/), incorporating a full width video hero, animated metric counters, satellite imagery panels, an auto scrolling partners strip, and a consistent footer all rendered in MCA's brand identity of **orange, charcoal, and steel grey**.

```
/                    (Home)
├── /about            (About)
├── /partners         (Partners)
└── /contact          (Contact)
```

| Page     | Route       | Description                                             |
|----------|-------------|-----------------------------------------------------------|
| Home     | `/`         | Hero, animated counters, about snippet, partners strip, EOHA CTA |
| About    | `/about`    | Organisation background, mission, vision, focus areas, team |
| Partners | `/partners` | Partner institution logos, descriptions, and external links |
| Contact  | `/contact`  | Contact form, interactive office map, social links       |

## System Actors

| Role                | Example                          | Frequency  | Access                          | Notes                                  |
|---------------------|-----------------------------------|------------|----------------------------------|-----------------------------------------|
| General Public       | Curious citizen, patient advocate | Occasional | All public pages, read-only      | Primary audience for the Home page      |
| Researcher            | Academic, data scientist          | Frequent   | All pages; follows EOHA CTA      | High intent — key conversion target     |
| Partner Institution   | NGO, funder, government body      | Occasional | Partners page, Contact form      | Checks partner listing & credibility    |
| Site Administrator    | Internal team                     | Rare       | Code-level content updates       | No CMS at launch — direct code edits    |

## Pages & Features

### Home Page (`/`)

The primary entry point for all user types. It immediately communicates the organisation's mission, creates visual impact through satellite imagery and a video hero, establishes credibility through animated metric counters, and drives high-intent users (researchers) toward the EOHA platform via a prominent CTA.

**Navigation Bar**
- Fixed/sticky top navigation on every page
- Client logo, left-aligned, links to `/`
- Nav links: Home · About · Partners · Contact, with active-state highlighting
- `Access the Platform` CTA button linking to the EOHA URL (opens in a new tab)
- Mobile: hamburger menu with a right-side drawer, breakpoint at 768px

**Hero Section**
- Full-viewport video background, autoplays muted and looped
- Fallback to static satellite imagery if the video fails to load
- Overlay text: organisation name and tagline, over a semi-transparent dark scrim (~0.55 opacity) for legibility
- Primary CTA: `Access the EOHA Platform` (high-contrast orange, opens in new tab)
- Secondary CTA: `Learn More` (smooth-scrolls to the About snippet)

**Animated Metric Counters**
- 3–4 counter cards animating from 0 to their target value on scroll-into-view
- Displayed on a dark charcoal band with orange-accented labels
- Example metrics: countries covered, research partners, datasets processed, publications

**About Snippet**
- Two-column layout: mission copy left, satellite imagery right
- Heading and 2–3 paragraph mission overview
- `Read More` link through to `/about`

**Partners Strip**
- Horizontal, auto-scrolling logo ticker that pauses on hover
- Logos rendered in greyscale by default, full colour on hover (CSS `grayscale()` filter)
- Each logo links to `/partners`

**Footer**
- Three-column layout: logo + tagline · nav links · contact info
- Social media icons (placeholders until accounts are confirmed)
- Copyright notice
- POPIA compliance notice / link to Privacy Policy

### About Page (`/about`)

Communicates the organisation's background, mission, vision, and values establishing institutional credibility for researchers and partner institutions evaluating whether to engage with the consortium.

- Page hero banner with satellite imagery background and page title
- **Mission Statement** section
- **Vision Statement** section
- **Background / History** — 3–5 paragraphs on the consortium's history
- **Core Focus Areas** — card grid (e.g. Disease Surveillance, Climate & Health, Remote Sensing), each card with an icon, title, and two-line description
- Closing CTA: `Get in Touch` → `/contact`

### Partners Page (`/partners`)

Lists all institutional partners of the Medical Consortium of Africa, signalling credibility and collaborative reach to researchers and funders evaluating the consortium's legitimacy.

- Page hero banner, styled consistently with the About page banner
- Introductory paragraph on the consortium's collaborative approach
- Grid of partner cards: logo, institution name, short description
- Each card links out to the partner's website in a new tab (`rel="noopener noreferrer"`)
- Optional grouping by category (Academic, Government, NGO, Funder) — pending confirmation
- Closing CTA: `Become a Partner — Contact Us` → `/contact`

### Contact Page (`/contact`)

Provides two mechanisms for engaging with MCA: a structured contact form that delivers messages to a designated consortium email, and an interactive map showing the organisation's office location.

**Contact Form fields**

| # | Field           | Control          | Required | Validation                                   |
|---|-----------------|------------------|----------|-----------------------------------------------|
| 1 | Full Name        | Text input        | Yes      | Min 2 characters, alpha + spaces only         |
| 2 | Email Address     | Email input       | Yes      | Must match RFC 5322 email format              |
| 3 | Organisation      | Text input        | No       | None                                            |
| 4 | Subject           | Select dropdown   | Yes      | Must select a value from the list             |
| 5 | Message           | Textarea          | Yes      | Minimum 20 characters                          |

**Subject dropdown options:** General Enquiry · Research Collaboration · Partnership Opportunity · Media / Press · Technical Support

**Business rules**
- On successful submission, a confirmation message is shown and an email is delivered to MCA
- On delivery failure, the user sees an error message with a direct fallback email address
- A POPIA privacy notice must accompany the form
- reCAPTCHA v3 or equivalent rate limiting is recommended (max 5 submissions per IP per hour)
- No form data is stored server-side — submissions are emailed only

**Interactive Office Location Map**
- Embedded map (Google Maps or Leaflet.js + OpenStreetMap) centred on the MCA office
- Custom marker in MCA brand orange (`#C85A1A`)
- 100% width, ~400px height on desktop; stacks below the form on mobile
- Optionally opens full Google Maps in a new tab on click

## Non-Functional Requirements

### Performance

| Requirement            | Target                                   |
|-------------------------|-------------------------------------------|
| Page Load (LCP)          | < 2.5s on 4G mobile                        |
| Time to Interactive       | < 3.5s                                     |
| Lighthouse Score          | ≥ 90 on Performance, Accessibility, Best Practices |
| Hero Video Size            | < 10MB, WebM with MP4 fallback            |
| Image Optimisation         | `next/image` — automatic WebP + lazy loading |

### Accessibility

WCAG 2.1 Level AA across all pages: minimum 4.5:1 colour contrast for body text, full keyboard navigation with visible focus states, descriptive alt text on all non-decorative images, semantic HTML with ARIA labels where needed, and testing against VoiceOver and NVDA.

### Security

HTTPS-only with automatic HTTP → HTTPS redirects, contact-form rate limiting (5 submissions/IP/hour), reCAPTCHA v3 bot protection, a Content-Security-Policy configured in `next.config.js`, no PII storage (form data is emailed only, never persisted to a database), and a POPIA-compliant privacy notice on the contact form.

### Browser & Device Support

Chrome 100+, Firefox 100+, Safari 15+, Edge 100+, iOS Safari 15+, Chrome for Android 100+. Responsive breakpoints: mobile < 768px · tablet 768–1024px · desktop > 1024px. Minimum supported screen width: 320px.

## Integration Requirements

**Contact Form Email** — The form on `/contact` submits to a Next.js API route (`/api/contact`), which uses **Resend** (preferred) or Nodemailer/SMTP to deliver the message to the MCA designated inbox. Subject format: `New Contact Form Submission: {Subject from form}`. On delivery failure, the API returns a 500 and the client displays a fallback message with a direct email address.

**Google Maps / Leaflet** — The office location map uses the Google Maps Embed/JavaScript API, or Leaflet.js + OpenStreetMap tiles as a zero-cost alternative if API costs are a concern.

**EOHA Platform Link** — A standard hyperlink (no iframe/embed) opening in a new tab with `rel="noopener noreferrer"`, present in the navbar CTA, the Home page hero, and the About snippet.

**Error Handling**

| ID | Error | Cause | Strategy |
|----|-------|-------|----------|
| ERR-001 | Contact form email delivery failure | SMTP/Resend unavailable | Return 500; show fallback message with direct email address |
| ERR-002 | Google Maps embed fails to load | Invalid API key or quota exceeded | Fall back to a static map image with office address as text |
| ERR-003 | Hero video fails to load | Missing file or network error | CSS fallback to static satellite imagery |
| ERR-004 | EOHA platform URL unavailable | External platform offline | Link still renders — external outage is out of scope |

## Reporting & Analytics

Recommended for post-launch monitoring via Google Analytics 4 / Vercel Analytics:

- **Page Views** — total visits per page (weekly)
- **Contact Form Submissions** — count received (weekly)
- **EOHA CTA Clicks** — clicks on "Access the Platform" (weekly)
- **Core Web Vitals** — LCP, FID, CLS per page via Google Search Console (monthly)
- **Partner Referral Traffic** — source/medium report (monthly)

## Tech Stack

| Technology | Purpose |
|---|---|
| **[Next.js](https://nextjs.org/)** (App Router) | Frontend rendering, routing, and static generation for all four pages |
| **TypeScript** | End-to-end type safety across components and API routes |
| **Tailwind CSS** | Utility-first styling for responsive layouts and MCA brand theming |
| **next/image** | Automatic WebP conversion and lazy loading for all imagery |
| **Resend** (or Nodemailer) | Contact form email delivery via a Next.js API route |
| **Google Maps API** or **Leaflet.js + OpenStreetMap** | Interactive office location map on the Contact page |
| **reCAPTCHA v3** | Bot protection on the contact form |
| **Vercel** | Hosting, deployment, and automatic SSL/TLS via Let's Encrypt |

## Project Structure

```
mca-website/
│
├── app/
│   ├── page.tsx                       # Home page (/)
│   ├── about/
│   │   └── page.tsx                   # About page (/about)
│   ├── partners/
│   │   └── page.tsx                   # Partners page (/partners)
│   ├── contact/
│   │   └── page.tsx                   # Contact page (/contact)
│   └── api/
│       └── contact/
│           └── route.ts               # Contact form email API route
│
├── components/
│   ├── NavBar.tsx                     # Sticky nav with mobile hamburger
│   ├── HeroSection.tsx                # Video background hero with CTAs
│   ├── MetricCounter.tsx              # Animated scroll-triggered counters
│   ├── AboutSnippet.tsx               # Two-column text + image (Home)
│   ├── PartnersStrip.tsx              # Auto-scrolling logo ticker (Home)
│   ├── PageHeroBanner.tsx             # Static banner (About, Partners, Contact)
│   ├── MissionVisionBlock.tsx         # Side-by-side mission/vision cards
│   ├── FocusAreaCard.tsx              # Icon + title + description (About)
│   ├── PartnerCard.tsx                # Logo + name + description + link (Partners)
│   ├── ContactForm.tsx                # Controlled form with validation
│   ├── MapEmbed.tsx                   # Google Maps or Leaflet embed
│   └── Footer.tsx                     # Three-column footer
│
├── public/
│   ├── video/                         # Hero video (WebM + MP4)
│   ├── images/                        # Satellite imagery, logos
│   └── partners/                      # Partner institution logos
│
├── next.config.js                     # CSP headers, image domains
├── tailwind.config.ts                 # MCA brand palette + theme tokens
└── .env                               # Environment variables (see below)
```

## Brand Reference

| Colour | Hex | Usage |
|---|---|---|
| **MCA Orange** | `#C85A1A` | CTAs, headings, counter accents, hover states |
| **Charcoal** | `#2C2C2C` | Body text, footer background, nav background |
| **Steel Grey** | `#6B7280` | Secondary text, card borders, greyscale partner logos |
| **Off-White** | `#F5F5F5` | Section backgrounds, card backgrounds |
| **White** | `#FFFFFF` | Primary background, text on dark backgrounds |

## Component Inventory

| Component | Used On | Notes |
|---|---|---|
| `NavBar` | All pages | Sticky, with mobile hamburger |
| `HeroSection` | Home | Video background with overlay and CTAs |
| `MetricCounter` | Home | Animated scroll-triggered counters |
| `AboutSnippet` | Home | Two-column text + image |
| `PartnersStrip` | Home | Auto-scrolling logo ticker |
| `PageHeroBanner` | About, Partners, Contact | Static banner with satellite imagery background |
| `MissionVisionBlock` | About | Side-by-side mission and vision cards |
| `FocusAreaCard` | About | Icon + title + description |
| `PartnerCard` | Partners | Logo + name + description + external link |
| `ContactForm` | Contact | Controlled form with validation |
| `MapEmbed` | Contact | Google Maps or Leaflet |
| `Footer` | All pages | Three-column layout |

## Environment Variables

Create a `.env` file in the project root:

```env
# Google Maps (only required if using the Google Maps API rather than Leaflet)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Contact form delivery
CONTACT_EMAIL_ADDRESS=
RESEND_API_KEY=

# Bot protection
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

> `NEXT_PUBLIC_*` variables are exposed to the browser — never place secrets (API secret keys, the Resend key) behind that prefix.

## Running Locally

**Prerequisites:** [Node.js](https://nodejs.org/en) and npm.

```bash
git clone [<repository-url>](https://github.com/MEDICONSORTIUM/mca-website.git)
cd mca-website
npm install
```

Add your environment variables to `.env` (see [Environment Variables](#environment-variables)), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The site deploys to **Vercel**, aligned with Next.js best practices:

1. Connect the GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Point the custom domain's A/CNAME records to Vercel
4. SSL/TLS is auto-provisioned via Let's Encrypt

## Open Issues

The following items are pending confirmation from MCA before launch:

| Issue | Status |
|---|---|
| EOHA platform URL not yet confirmed | Open |
| Contact form destination email not confirmed | Open |
| Metric counter values not supplied | Open |
| Partner institution list (names, logos, URLs) not finalised | Open |
| Office coordinates for the map not supplied | Open |
| Hero video asset not provided | Open |
| Logo SVG version not available (PNG only) | Open |
| Google Maps vs. Leaflet decision pending (cost vs. simplicity) | Open |
| Social media accounts not yet created | Open |

## Related Documents

| Component | Reference | Description |
|---|---|---|
| Design Reference | [sansa.org.za](https://www.sansa.org.za/) | Layout and structural reference |
| Functional Specification | *MCA Website Design Specification v1.1* | Full FSD this README is derived from |
| Framework Docs | [nextjs.org/docs](https://nextjs.org/docs) | Next.js documentation |
| Hosting Docs | [vercel.com/docs](https://vercel.com/docs) | Vercel deployment documentation |
| Accessibility Standard | [WCAG 2.1](https://www.w3.org/TR/WCAG21/) | Compliance target |
| Data Privacy | [POPIA](https://www.justice.gov.za/inforeg/) | South Africa's data privacy legislation |

<div align="center">

© 2026 Medical Consortium of Africa (PTY) LTD. All rights reserved.

</div>
</content>
